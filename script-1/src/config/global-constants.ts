export const globalConstants = {
  googleSheetCredential: process.env.GOOGLE_SHEETS_CREDENTIALS || "{}",
  mailUsername: process.env.OUTLOOK_USER || "example.com",
  mailPassword: process.env.OUTLOOK_PASSWORD || "password here",
  googleSheetId: process.env.GOOGLE_SHEET_ID || ""
};