// Optional alternative to a Google Form:
// 1. Create a Google Sheet with headers: Timestamp | Email
// 2. Extensions → Apps Script → paste this file
// 3. Deploy → New deployment → Web app
//    Execute as: Me
//    Who has access: Anyone
// 4. Put the web app URL in SUBSCRIBE_SHEET_WEBHOOK

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const data = JSON.parse(e.postData.contents || '{}')
  const email = String(data.email || '')
    .trim()
    .toLowerCase()
  if (!email) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(
      ContentService.MimeType.JSON,
    )
  }
  sheet.appendRow([new Date().toISOString(), email])
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  )
}
