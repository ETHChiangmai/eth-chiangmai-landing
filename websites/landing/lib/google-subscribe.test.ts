import { expect, test } from 'bun:test'
import { googleFormBody, googleSubscribeConfig } from './google-subscribe'

test('googleSubscribeConfig is disabled until form or webhook is set', () => {
  expect(googleSubscribeConfig().enabled).toBe(false)
  expect(googleSubscribeConfig({ SUBSCRIBE_SHEET_WEBHOOK: 'https://script.google.com/macros/s/abc/exec' }).enabled).toBe(true)
  expect(
    googleSubscribeConfig({
      SUBSCRIBE_GOOGLE_FORM_ACTION: 'https://docs.google.com/forms/d/e/abc/formResponse',
      SUBSCRIBE_GOOGLE_EMAIL_ENTRY: 'entry.123',
    }).enabled,
  ).toBe(true)
})

test('googleFormBody posts the email to the form entry', () => {
  expect(googleFormBody('ada@example.com', 'entry.123').toString()).toBe('entry.123=ada%40example.com')
})
