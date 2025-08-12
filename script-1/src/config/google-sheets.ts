import { google } from "googleapis";
import { JWT } from 'google-auth-library';
import { globalConstants } from "./global-constants";
const serviceAccount = JSON.parse(globalConstants.googleSheetCredential)

export class GoogleSheetService {
  async getGoogleSheetClient(){
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = (await auth.getClient()) as JWT;
    return google.sheets({
      version:"v4",
      auth:authClient
    })
  }
  async readGoogleSheet(
    sheetId: string,
    tabName: string,
    range: string){
    const client = await this.getGoogleSheetClient();
    const res = await client.spreadsheets.values.get({
      spreadsheetId:sheetId,
      range:`${tabName}!${range}`
    })
    return res.data.values
  }
}