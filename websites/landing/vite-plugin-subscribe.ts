import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

type Subscriber = { email: string; createdAt: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STORE = path.resolve(process.cwd(), 'data/subscribers.json')

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

  // Honeypot: pretend it worked.
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

export function subscribeApiPlugin(): Plugin {
  return {
    name: 'subscribe-api',
    configureServer(server) {
      server.middlewares.use('/api/subscribe', (req, res) => {
        void handleSubscribe(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/subscribe', (req, res) => {
        void handleSubscribe(req, res)
      })
    },
  }
}
