import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const NAMESPACE_TITLE = 'ethcm-subscribers'
const PAGES_PROJECT = 'ethcm'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WRANGLER_TOML = resolve(ROOT, 'wrangler.toml')

type Namespace = { id: string; title: string }

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

async function bindPagesProject(kvId: string | null) {
  if (!kvId) {
    console.log('Leaving existing Pages subscriber storage untouched.')
    return
  }

  await cf(`/pages/projects/${PAGES_PROJECT}`, {
    method: 'PATCH',
    body: JSON.stringify({
      deployment_configs: {
        production: { kv_namespaces: { SUBSCRIBERS: { namespace_id: kvId } } },
        preview: { kv_namespaces: { SUBSCRIBERS: { namespace_id: kvId } } },
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
  await bindPagesProject(kvId)
  console.log(
    kvId
      ? 'Bound SUBSCRIBERS KV on the Pages project.'
      : 'Left existing subscriber storage untouched.',
  )
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`Failed to configure subscriber storage: ${message}`)
  process.exit(1)
}
