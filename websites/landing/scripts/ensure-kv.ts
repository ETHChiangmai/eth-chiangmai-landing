import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const NAMESPACE_TITLE = 'ethcm-subscribers'
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const WRANGLER_TOML = resolve(ROOT, 'wrangler.toml')

type Namespace = { id: string; title: string }

async function cf(path: string, init: RequestInit = {}) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim()
  const token = process.env.CLOUDFLARE_API_TOKEN?.trim()
  if (!accountId || !token) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required')
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
    errors?: { code?: number; message: string }[]
  }
  if (!res.ok || !body.success) {
    const detail = body.errors?.map((error) => error.message).join(', ') || res.statusText
    throw new Error(`Cloudflare API ${path} failed (${res.status}): ${detail}`)
  }
  return body.result
}

async function findOrCreateNamespace(): Promise<string> {
  let page = 1
  for (;;) {
    const result = await cf(`/storage/kv/namespaces?per_page=100&page=${page}`)
    const namespaces = Array.isArray(result) ? (result as Namespace[]) : []
    const match = namespaces.find((item) => item.title === NAMESPACE_TITLE)
    if (match) return match.id
    if (namespaces.length < 100) break
    page += 1
  }

  const created = (await cf('/storage/kv/namespaces', {
    method: 'POST',
    body: JSON.stringify({ title: NAMESPACE_TITLE }),
  })) as Namespace
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

try {
  const id = await findOrCreateNamespace()
  writeKvBinding(id)
  console.log(`Using KV namespace ${NAMESPACE_TITLE} (${id})`)
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.warn(`Skipping KV setup: ${message}`)
  console.warn('The site will still deploy. Bind a KV namespace named SUBSCRIBERS in Cloudflare Pages to enable the CSV list.')
}
