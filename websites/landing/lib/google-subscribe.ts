/**
 * Production newsletter signups go to a Google Form, which appends a row
 * to its linked Google Sheet.
 *
 * Setup:
 * 1. Create a Google Form with one Short-answer question named "Email"
 * 2. Responses → Link to Sheets
 * 3. Open the form, copy the /viewform URL, and send it so the action + entry IDs can be filled in
 */
export const GOOGLE_SUBSCRIBE_FORM_ACTION = ''
export const GOOGLE_SUBSCRIBE_EMAIL_ENTRY = ''
export const GOOGLE_SUBSCRIBE_SHEET_URL = ''

export type GoogleSubscribeEnv = {
  SUBSCRIBE_GOOGLE_FORM_ACTION?: string
  SUBSCRIBE_GOOGLE_EMAIL_ENTRY?: string
  SUBSCRIBE_GOOGLE_SHEET_URL?: string
  SUBSCRIBE_SHEET_WEBHOOK?: string
}

export function googleSubscribeConfig(env: GoogleSubscribeEnv = {}) {
  const formAction = (env.SUBSCRIBE_GOOGLE_FORM_ACTION || GOOGLE_SUBSCRIBE_FORM_ACTION).trim()
  const emailEntry = (env.SUBSCRIBE_GOOGLE_EMAIL_ENTRY || GOOGLE_SUBSCRIBE_EMAIL_ENTRY).trim()
  const sheetUrl = (env.SUBSCRIBE_GOOGLE_SHEET_URL || GOOGLE_SUBSCRIBE_SHEET_URL).trim()
  const webhook = (env.SUBSCRIBE_SHEET_WEBHOOK || '').trim()
  return {
    formAction,
    emailEntry,
    sheetUrl,
    webhook,
    enabled: Boolean((formAction && emailEntry) || webhook),
  }
}

export function googleFormBody(email: string, emailEntry: string) {
  const body = new URLSearchParams()
  body.set(emailEntry, email)
  return body
}
