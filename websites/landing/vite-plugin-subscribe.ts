import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import {
  DEFAULT_EXPORT_KEY,
  EMAIL_RE,
  exportKeyFromRequest,
  isAuthorizedExport,
  subscribersToCsv,
  type Subscriber,
} from './lib/subscribers'

const STORE = path.resolve(process.cwd(), 'data/subscribers.json')

function requestPath(req: IncomingMessage): string {
  return (req.url || '/').split('?')[0]
}

function requestUrl(req: IncomingMessage): URL {
  return new URL(req.url || '/', 'http://localhost')
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

function readStore(): Subscriber[] {
  try {
    return JSON.parse(fs.readFileSync(STORE, 'utf8')) as Subscriber[]
  } catch {
    return []
  }
}

function expectedExportKey(): string {
  return process.env.SUBSCRIBE_EXPORT_KEY || DEFAULT_EXPORT_KEY
}

async function handleSubscribe(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  if (req.method !== 'POST') {
    json(res, 405, { error: 'Method not allowed' })
    return
  }

  let payload: { email?: string; website?: string }
  try {
    payload = JSON.parse((await readBody(req)) || '{}')
  } catch {
    json(res, 400, { error: 'Invalid JSON' })
    return
  }

  if (payload.website) {
    json(res, 200, { ok: true })
    return
  }

  const email = payload.email?.trim().toLowerCase() ?? ''
  if (!EMAIL_RE.test(email)) {
    json(res, 400, { error: 'Invalid email' })
    return
  }

  const list = readStore()
  if (!list.some((entry) => entry.email === email)) {
    list.push({ email, createdAt: new Date().toISOString() })
    fs.mkdirSync(path.dirname(STORE), { recursive: true })
    fs.writeFileSync(STORE, `${JSON.stringify(list, null, 2)}\n`)
  }

  json(res, 200, { ok: true })
}

function handleExport(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  if (req.method !== 'GET') {
    json(res, 405, { error: 'Method not allowed' })
    return
  }

  const provided = exportKeyFromRequest(requestUrl(req), req.headers.authorization)
  if (!isAuthorizedExport(provided, expectedExportKey())) {
    json(res, 401, { error: 'Unauthorized' })
    return
  }

  const csv = subscribersToCsv(readStore())
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="ethchiangmai-subscribers.csv"')
  res.setHeader('Cache-Control', 'no-store')
  res.end(csv)
}

function subscribeMiddleware(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const pathname = requestPath(req)
  if (pathname === '/api/subscribe') {
    void handleSubscribe(req, res)
    return
  }
  if (pathname === '/api/subscribers' || pathname === '/api/subscribers.csv') {
    handleExport(req, res)
    return
  }
  next()
}

export function subscribeApiPlugin(): Plugin {
  return {
    name: 'subscribe-api',
    configureServer(server) {
      server.middlewares.use(subscribeMiddleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(subscribeMiddleware)
    },
  }
}
