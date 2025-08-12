import { getTemplate } from "./config/get-template";
import { globalConstants } from "./config/global-constants";
import { GoogleSheetService } from "./config/google-sheets";
import { Nodemailer } from "./config/nodemailer";
import { ResponseMessageDto } from "./config/response-message";
const googleSheetService = new GoogleSheetService();
async function main() {
  const response = new ResponseMessageDto()

  // List users
  const googleSheetsData = await googleSheetService.readGoogleSheet(
    globalConstants.googleSheetId,
    "users",
    "A2:B999"
  );
  if (googleSheetService) {
    for (let index = 0; index < googleSheetsData.length; index++) {
      const user = googleSheetsData[index];
      if (user) {
        const name = user[0]
        const email = user[1]
        if(!name){
          response.message = "Una fila tiene el nombre vació"
          response.status_code=400
          response.success=false
          console.log(response)
          return
        }
        if(!email){
          response.message = "Una fila tiene el correo vació"
          response.status_code=400
          response.success=false
          return
        }
        if(!email.includes("@")){
          response.message = `{ name: ${name},message: Correo inválido`
          response.status_code=400
          response.success=false
          console.log(response)
        }
        const nameSplit = name.split(" ")[0];
          if (nameSplit && email ) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const nodeMailer = new Nodemailer({
              subject: "Meet & Greet STRACON Group - Perumin 2025",
              to: email,
              html: getTemplate({ name }),
            });
            const sendEmail = await nodeMailer.send()
            if(!sendEmail.success){
              response.message = `{"name": "${name}", "email":"${email}", "message": "Error al enviar correo"}`
              response.success = false
              response.status_code = 400
            }else{
              response.message = `{"name": "${name}", "email":"${email}", "message": "Correo enviado exitosamente"}`
            }
            console.log(response)
          }        
      }
    }
  }
}

main();
