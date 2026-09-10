import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const NAMESPACE_TITLE = 'ethcm-subscribers'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WRANGLER_TOML = resolve(ROOT, 'wrangler.toml')

type Namespace = { id: string; title: string }

async function cf(path: string, init: RequestInit = {}) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const token = process.env.CLOUDFLARE_API_TOKEN
  if (!accountId || !token) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required to set up subscriber storage')
  }

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
    result?: unknown
    errors?: { message: string }[]
  }
  if (!res.ok || !body.success) {
    const detail = body.errors?.map((error) => error.message).join(', ') || res.statusText
    throw new Error(`Cloudflare API ${path} failed: ${detail}`)
  }
  return body.result
}

async function findOrCreateNamespace(): Promise<string> {
  let page = 1
  for (;;) {
    const result = (await cf(`/storage/kv/namespaces?per_page=100&page=${page}`)) as Namespace[]
    const match = result.find((item) => item.title === NAMESPACE_TITLE)
    if (match) return match.id
    if (result.length < 100) break
    page += 1
  }

  const created = (await cf('/storage/kv/namespaces', {
    method: 'POST',
    body: JSON.stringify({ title: NAMESPACE_TITLE }),
  })) as Namespace
  return created.id
}

function patchWranglerToml(id: string) {
  const current = readFileSync(WRANGLER_TOML, 'utf8')
  const updated = current.replace(
    /binding = "SUBSCRIBERS"\s+id = "[^"]+"/,
    `binding = "SUBSCRIBERS"\nid = "${id}"`,
  )
  if (!updated.includes(`id = "${id}"`)) {
    throw new Error('Could not patch SUBSCRIBERS id in wrangler.toml')
  }
  writeFileSync(WRANGLER_TOML, updated)
}

const id = await findOrCreateNamespace()
patchWranglerToml(id)
console.log(`Using KV namespace ${NAMESPACE_TITLE} (${id})`)
