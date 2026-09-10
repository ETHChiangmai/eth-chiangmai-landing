export type Subscriber = {
  email: string
  createdAt: string
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Shared download key for /api/subscribers.csv. Override with SUBSCRIBE_EXPORT_KEY. */
export const DEFAULT_EXPORT_KEY = 'ethcm_d87b90d6f23d48f9b713c286'

export function exportKeyFromRequest(url: URL, authorization?: string | null): string {
  const fromQuery = url.searchParams.get('key') || url.searchParams.get('token') || ''
  const fromHeader = authorization?.startsWith('Bearer ') ? authorization.slice(7).trim() : ''
  return fromQuery || fromHeader
}

export function isAuthorizedExport(provided: string, expected: string): boolean {
  if (!provided || !expected || provided.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

function csvField(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replaceAll('"', '""')}"`
  return value
}

export function subscribersToCsv(rows: Subscriber[]): string {
  const lines = [...rows]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.email.localeCompare(b.email))
    .map((row) => `${csvField(row.email)},${csvField(row.createdAt)}`)
  return ['email,created_at', ...lines].join('\n') + '\n'
}

export function csvResponse(rows: Subscriber[]): Response {
  return new Response(subscribersToCsv(rows), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="ethchiangmai-subscribers.csv"',
      'Cache-Control': 'no-store',
    },
  })
}
