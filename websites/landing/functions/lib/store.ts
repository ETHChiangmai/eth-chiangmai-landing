import {
  csvResponse,
  DEFAULT_EXPORT_KEY,
  EMAIL_RE,
  exportKeyFromRequest,
  isAuthorizedExport,
  type Subscriber,
} from '../../lib/subscribers'

export type SubscriberEnv = {
  SUBSCRIBERS?: {
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

export async function listSubscribers(env: SubscriberEnv): Promise<Subscriber[]> {
  const kv = env.SUBSCRIBERS
  if (!kv) return []

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

export async function saveSubscriber(env: SubscriberEnv, email: string): Promise<boolean> {
  if (!env.SUBSCRIBERS) return false
  const createdAt = new Date().toISOString()
  await env.SUBSCRIBERS.put(`email:${email}`, JSON.stringify({ email, createdAt }))
  return true
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

  const stored = await saveSubscriber(context.env, email)
  if (!stored) {
    return json({ error: 'Subscriber storage is not configured' }, 503)
  }

  return json({ ok: true })
}

export async function handleSubscribersGet(context: { request: Request; env: SubscriberEnv }) {
  const url = new URL(context.request.url)
  const expected = context.env.SUBSCRIBE_EXPORT_KEY || DEFAULT_EXPORT_KEY
  const provided = exportKeyFromRequest(url, context.request.headers.get('authorization'))
  if (!isAuthorizedExport(provided, expected)) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const rows = await listSubscribers(context.env)
  return csvResponse(rows)
}
