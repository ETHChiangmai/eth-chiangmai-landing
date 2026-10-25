import {
  DEFAULT_EXPORT_KEY,
  EMAIL_RE,
  csvResponse,
  exportKeyFromRequest,
  isAuthorizedExport,
  type Subscriber,
} from '../../lib/subscribers'

const PAGES_PROJECT = 'ethcm'
const STORE_VAR = 'SUBSCRIBERS_DATA'

type KvBinding = {
  put(key: string, value: string): Promise<void>
  get(key: string): Promise<string | null>
  list(options: {
    prefix?: string
    cursor?: string
  }): Promise<{
    keys: { name: string }[]
    list_complete: boolean
    cursor?: string
  }>
}

type PagesEnvVar = {
  type?: string
  value?: string
}

type PagesProductionConfig = {
  env_vars?: Record<string, PagesEnvVar>
  kv_namespaces?: Record<string, { namespace_id: string }>
  [key: string]: unknown
}

type PagesProject = {
  deployment_configs?: {
    production?: PagesProductionConfig
    preview?: PagesProductionConfig
  }
}

type SaveResult = {
  isNew: boolean
  rows: Subscriber[]
}

export type SubscriberEnv = {
  SUBSCRIBERS?: KvBinding
  CF_API_TOKEN?: string
  CF_ACCOUNT_ID?: string
  CLOUDFLARE_API_TOKEN?: string
  CLOUDFLARE_ACCOUNT_ID?: string
  SUBSCRIBE_EXPORT_KEY?: string
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
    },
  })
}

export function corsOptions(methods: string) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': methods,
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization',
    },
  })
}

function notFound() {
  return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } })
}

function accountId(env: SubscriberEnv) {
  return env.CF_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID || ''
}

function apiToken(env: SubscriberEnv) {
  return env.CF_API_TOKEN || env.CLOUDFLARE_API_TOKEN || ''
}

function canUsePagesStore(env: SubscriberEnv) {
  return Boolean(accountId(env) && apiToken(env))
}

async function pagesApi(env: SubscriberEnv, path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId(env)}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiToken(env)}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  })
  const body = (await res.json()) as {
    success: boolean
    result?: PagesProject
    errors?: { message: string }[]
  }
  if (!res.ok || !body.success) {
    const detail = body.errors?.map((error) => error.message).join(', ') || res.statusText
    throw new Error(`Cloudflare Pages API failed (${res.status}): ${detail}`)
  }
  return (body.result ?? {}) as PagesProject
}

function parseStore(raw: string | undefined): Subscriber[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as Subscriber[]
    return Array.isArray(parsed) ? parsed.filter((row) => row?.email) : []
  } catch {
    return []
  }
}

async function listFromKv(kv: KvBinding): Promise<Subscriber[]> {
  const rows: Subscriber[] = []
  let cursor: string | undefined

  do {
    const page = await kv.list({ prefix: 'email:', cursor })
    for (const key of page.keys) {
      const raw = await kv.get(key.name)
      if (!raw) continue
      try {
        const parsed = JSON.parse(raw) as Subscriber
        if (parsed.email) rows.push(parsed)
      } catch {
        rows.push({ email: raw, createdAt: '' })
      }
    }
    cursor = page.list_complete ? undefined : page.cursor
  } while (cursor)

  return rows
}

async function listFromPages(env: SubscriberEnv): Promise<Subscriber[]> {
  const project = await pagesApi(env, `/pages/projects/${PAGES_PROJECT}`)
  return parseStore(project.deployment_configs?.production?.env_vars?.[STORE_VAR]?.value)
}

async function saveToPages(env: SubscriberEnv, email: string): Promise<SaveResult | null> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const project = await pagesApi(env, `/pages/projects/${PAGES_PROJECT}`)
    const rows = parseStore(project.deployment_configs?.production?.env_vars?.[STORE_VAR]?.value)
    const isNew = !rows.some((row) => row.email === email)
    if (isNew) {
      rows.push({ email, createdAt: new Date().toISOString() })
    }

    await pagesApi(env, `/pages/projects/${PAGES_PROJECT}`, {
      method: 'PATCH',
      body: JSON.stringify({
        deployment_configs: {
          production: {
            env_vars: {
              [STORE_VAR]: { type: 'plain_text', value: JSON.stringify(rows) },
            },
          },
        },
      }),
    })
    return { isNew, rows }
  }
  return null
}

async function saveToKv(kv: KvBinding, email: string): Promise<SaveResult> {
  const existing = await kv.get(`email:${email}`)
  const isNew = !existing
  if (isNew) {
    const createdAt = new Date().toISOString()
    await kv.put(`email:${email}`, JSON.stringify({ email, createdAt }))
  }
  return { isNew, rows: await listFromKv(kv) }
}

export async function saveSubscriber(env: SubscriberEnv, email: string): Promise<SaveResult | null> {
  if (env.SUBSCRIBERS) return saveToKv(env.SUBSCRIBERS, email)
  if (canUsePagesStore(env)) return saveToPages(env, email)
  return null
}

export async function listSubscribers(env: SubscriberEnv): Promise<Subscriber[] | null> {
  if (env.SUBSCRIBERS) return listFromKv(env.SUBSCRIBERS)
  if (canUsePagesStore(env)) return listFromPages(env)
  return null
}

export async function handleSubscribePost(context: { request: Request; env: SubscriberEnv }) {
  let payload: { email?: string; website?: string }
  try {
    payload = (await context.request.json()) as { email?: string; website?: string }
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (payload.website) {
    return json({ ok: true })
  }

  const email = payload.email?.trim().toLowerCase() ?? ''
  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Invalid email' }, 400)
  }

  let saved: SaveResult | null
  try {
    saved = await saveSubscriber(context.env, email)
  } catch {
    return json({ error: 'Subscriber storage is not configured' }, 503)
  }
  if (!saved) {
    return json({ error: 'Subscriber storage is not configured' }, 503)
  }

  return json({ ok: true })
}

export async function handleSubscribersExport(context: { request: Request; env: SubscriberEnv }) {
  if (context.request.method === 'OPTIONS') return corsOptions('GET, OPTIONS')
  if (context.request.method !== 'GET') return json({ error: 'Method not allowed' }, 405)

  const url = new URL(context.request.url)
  const provided = exportKeyFromRequest(url, context.request.headers.get('authorization'))
  const expected = context.env.SUBSCRIBE_EXPORT_KEY || DEFAULT_EXPORT_KEY
  if (!isAuthorizedExport(provided, expected)) {
    return json({ error: 'Unauthorized' }, 401)
  }

  try {
    const rows = await listSubscribers(context.env)
    if (!rows) return json({ error: 'Subscriber storage is not configured' }, 503)
    return csvResponse(rows)
  } catch {
    return json({ error: 'Could not load subscribers' }, 503)
  }
}

export function handleSubscribersGone() {
  return notFound()
}
