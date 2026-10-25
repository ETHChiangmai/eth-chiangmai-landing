import { expect, test } from 'bun:test'
import { appendSubscriber, isUnreadableStore, parseSubscriberStore } from './subscribers'

test('appendSubscriber adds a new email without dropping existing rows', () => {
  const existing = [{ email: 'first@example.com', createdAt: '2026-01-01T00:00:00.000Z' }]
  const next = appendSubscriber(existing, 'second@example.com', '2026-01-02T00:00:00.000Z')

  expect(next.isNew).toBe(true)
  expect(next.rows).toEqual([
    { email: 'first@example.com', createdAt: '2026-01-01T00:00:00.000Z' },
    { email: 'second@example.com', createdAt: '2026-01-02T00:00:00.000Z' },
  ])
  expect(existing).toHaveLength(1)
})

test('appendSubscriber does not duplicate an email', () => {
  const existing = [{ email: 'first@example.com', createdAt: '2026-01-01T00:00:00.000Z' }]
  const next = appendSubscriber(existing, 'first@example.com', '2026-01-03T00:00:00.000Z')

  expect(next.isNew).toBe(false)
  expect(next.rows).toEqual(existing)
})

test('parseSubscriberStore reads a JSON list and ignores junk', () => {
  expect(parseSubscriberStore('[{"email":"a@b.com","createdAt":"t"}]')).toEqual([
    { email: 'a@b.com', createdAt: 't' },
  ])
  expect(parseSubscriberStore(undefined)).toEqual([])
  expect(parseSubscriberStore('not-json')).toEqual([])
})

test('isUnreadableStore blocks overwrites when Cloudflare hides the value', () => {
  expect(isUnreadableStore(undefined)).toBe(false)
  expect(isUnreadableStore({ type: 'plain_text', value: '[]' })).toBe(false)
  expect(isUnreadableStore({ type: 'plain_text' })).toBe(true)
})
