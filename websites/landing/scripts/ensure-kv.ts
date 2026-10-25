import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const NAMESPACE_TITLE = 'ethcm-subscribers'
const PAGES_PROJECT = 'ethcm'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WRANGLER_TOML = resolve(ROOT, 'wrangler.toml')

type Namespace = { id: string; title: string }
type PagesEnvVar = { type?: string; value?: string }
type PagesConfig = {
  env_vars?: Record<string, PagesEnvVar>
  kv_namespaces?: Record<string, { namespace_id: string }>
}
type PagesProject = {
  deployment_configs?: {
    production?: PagesConfig
    preview?: PagesConfig
  }
}

function credentials() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim()
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim()
  if (!accountId || !token) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required')
  }
  return { accountId, token }
}

async function cf<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { accountId, token } = credentials()
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })
  const body = (await res.json()) as {
    success: boolean
    result?: T
    errors?: { code?: number; message: string }[]
  }
  if (!res.ok || !body.success) {
    const detail = body.errors?.map((error) => error.message).join(', ') || res.statusText
    throw new Error(`Cloudflare API ${path} failed (${res.status}): ${detail}`)
  }
  return body.result as T
}

async function findOrCreateNamespace(): Promise<string> {
  let page = 1
  for (;;) {
    const namespaces = await cf<Namespace[]>(`/storage/kv/namespaces?per_page=100&page=${page}`)
    const match = namespaces.find((item) => item.title === NAMESPACE_TITLE)
    if (match) return match.id
    if (namespaces.length < 100) break
    page += 1
  }

  const created = await cf<Namespace>('/storage/kv/namespaces', {
    method: 'POST',
    body: JSON.stringify({ title: NAMESPACE_TITLE }),
  })
  if (!created?.id) throw new Error('KV namespace create did not return an id')
  return created.id
}

function tomlString(value: string) {
  return JSON.stringify(value)
}

function injectWranglerVars(subscriberJson?: string) {
  const { accountId, token } = credentials()
  const current = readFileSync(WRANGLER_TOML, 'utf8')
    .replace(/\n\[vars\][\s\S]*$/m, '')
    .trimEnd()
  const lines = [
    current,
    '',
    '[vars]',
    `SUBSCRIBE_CF_ACCOUNT = ${tomlString(accountId)}`,
    `SUBSCRIBE_CF_TOKEN = ${tomlString(token)}`,
  ]
  if (subscriberJson) {
    lines.push(`SUBSCRIBERS_DATA = ${tomlString(subscriberJson)}`)
  }
  writeFileSync(WRANGLER_TOML, `${lines.join('\n')}\n`)
}

function writeKvBinding(id: string) {
  const current = readFileSync(WRANGLER_TOML, 'utf8')
  if (current.includes(`id = "${id}"`) && current.includes('binding = "SUBSCRIBERS"')) return

  const withoutKv = current.replace(/\n\[\[kv_namespaces\]\][\s\S]*$/m, '').trimEnd() + '\n'
  writeFileSync(
    WRANGLER_TOML,
    `${withoutKv}
[[kv_namespaces]]
binding = "SUBSCRIBERS"
id = "${id}"
`,
  )
}

function credentialVars() {
  const { accountId, token } = credentials()
  return {
    SUBSCRIBE_CF_ACCOUNT: { type: 'plain_text', value: accountId },
    SUBSCRIBE_CF_TOKEN: { type: 'secret_text', value: token },
  }
}

function envVarsKeepingList(config: PagesConfig | undefined): Record<string, PagesEnvVar> {
  const existing = config?.env_vars ?? {}
  const next: Record<string, PagesEnvVar> = {}
  for (const [key, value] of Object.entries(existing)) {
    if (key === 'SUBSCRIBERS_DATA' && value?.value === undefined) continue
    if (value?.value) next[key] = value
  }
  Object.assign(next, credentialVars())
  if (existing.SUBSCRIBERS_DATA?.value) {
    next.SUBSCRIBERS_DATA = existing.SUBSCRIBERS_DATA
  }
  return next
}

async function bindPagesProject(kvId: string | null) {
  const project = await cf<PagesProject>(`/pages/projects/${PAGES_PROJECT}`)
  const productionEnv = envVarsKeepingList(project.deployment_configs?.production)
  const previewEnv = envVarsKeepingList(project.deployment_configs?.preview)
  const kv = kvId ? { kv_namespaces: { SUBSCRIBERS: { namespace_id: kvId } } } : {}

  await cf(`/pages/projects/${PAGES_PROJECT}`, {
    method: 'PATCH',
    body: JSON.stringify({
      deployment_configs: {
        production: { env_vars: productionEnv, ...kv },
        preview: { env_vars: previewEnv, ...kv },
      },
    }),
  })
}

let kvId: string | null = null
try {
  kvId = await findOrCreateNamespace()
  writeKvBinding(kvId)
  console.log(`Using KV namespace ${NAMESPACE_TITLE} (${kvId})`)
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.warn(`KV namespace unavailable: ${message}`)
  console.warn('Falling back to Pages project storage for the subscriber CSV.')
}

try {
  const project = await cf<PagesProject>(`/pages/projects/${PAGES_PROJECT}`)
  const backup = project.deployment_configs?.production?.env_vars?.SUBSCRIBERS_DATA?.value
  injectWranglerVars(backup)
  let backupCount = 0
  try {
    backupCount = Array.isArray(JSON.parse(backup ?? '[]')) ? JSON.parse(backup ?? '[]').length : 0
  } catch {
    backupCount = 0
  }
  console.log(
    backupCount
      ? `Injected subscribe credentials and ${backupCount} saved emails into wrangler.toml`
      : 'Injected subscribe credentials into wrangler.toml',
  )
  await bindPagesProject(kvId)
  console.log(
    kvId
      ? 'Bound SUBSCRIBERS KV and subscribe credentials on the Pages project.'
      : 'Restored subscribe credentials without resetting the subscriber list.',
  )
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Failed to configure subscriber storage: ${message}`)
  process.exit(1)
}
