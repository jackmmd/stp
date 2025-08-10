import { enviroment } from "../../config/enviroment";
import { ResponseListDto } from "../../others/dto/response.list.dto";
import { ResponseMessageDto } from "../../others/dto/response.message.dto";
import { GoogleSheetService } from "../../others/services/google-sheet.service";
import { EmailNodemailer } from "../emails/others/email-nodemailer";
import { ListAdUserSheetsDto } from "./dto/list-ad-user-sheets.dto";
import { ListAdUser } from "./dto/list-ad-user.dto";
import { ListCredentialDto } from "./dto/list-credential.dto";
import ActivedDirectory from 'activedirectory2'
import prisma from "../../config/prisma";
import { Prisma } from "@prisma/client";
import ldap from 'ldapjs';
import { parseDateDDMMYYYY, toTitleCase } from "../../others/functions/functions-generics";
const googleSheetService = new GoogleSheetService()
// const ad = new ActivedDirectory({
//       url: 'ldap://192.168.100.20',
//       baseDN: 'dc=wortika,dc=com',
//       username: 'Administrator@wortika.com',
//       password: ']jackmmd2004'
// })
const ad = new ActivedDirectory({
      url: enviroment.adUrl,
      baseDN: enviroment.adBaseDn,
      username: enviroment.adUserName,
      password: enviroment.adPassword
})
export class AdUserService {
  async list(): Promise<ResponseListDto<ListAdUser>> {
    const response = new ResponseListDto<ListAdUser>()
    return new Promise((resolve, reject) => {
      ad.findUsers((error, users: any[]) => {
        if (error) return reject(ResponseMessageDto.badRequest("Error list AD users"))
        if (users) {
          response.total_count = users.length
          response.items = users.map((user: ListAdUser) => {
            return {
              cn: user.cn,
              description: user.description,
              displayName: user.displayName,
              distinguishedName: user.distinguishedName,
              dn: user.dn,
              givenName: user.givenName,
              mail: user.mail,
              pwdLastSet: user.pwdLastSet,
              sAMAccountName: user.sAMAccountName,
              sn: user.sn,
              userAccountControl: user.userAccountControl,
              userPrincipalName: user.userPrincipalName,
              whenCreated: user.whenCreated
            }
          })
          resolve(response)
        }
      })
    })
  }
  async listSheets() {
    const response = new ResponseListDto<ListAdUserSheetsDto>()
    const googleSheetData = await googleSheetService.readGoogleSheet("1PL1pzj2vtXYSmmcrBkGrkP0dmW2-Cvtc_qBlv2DGQdg", "create-or-update", "A2:Z999")
    if (googleSheetData) {
      response.items = googleSheetData.map(user => {
        return {
          ticket: user[0],
          request_date: user[1],
          registration_date: user[2],
          registration_time: user[3],
          name: toTitleCase(user[4]),
          lastname:toTitleCase(user[5]),
          dni: user[6],
          contract_start_date: user[7],
          contract_end_date: user[8],
          company: user[9],
          display_name: toTitleCase(user[10]),
          email: user[11],
          password: user[12],
          workplace: user[13],
          work_group_or_mailing_list: user[14],
          work_group_or_mailing_list2: user[15],
          work_group_or_mailing_list3: user[16],
          cost_center: user[17],
          position: user[18],
          management_division: user[19],
          phone_number: user[20],
          personal_email: user[21],
          address: user[22],
          employee_id: user[23],
          ad_user: user[24],
          licensed_user: user[25],
          observation: user[26]
        }
      })
    }
    return response
  }
  async createSheets():Promise<ResponseMessageDto>{
    const response = new ResponseMessageDto()
    const {items} = await this.listSheets()
    const client = ldap.createClient({
    url: enviroment.adUrl
    });
    await new Promise((resolve, reject) => {
      client.bind(enviroment.adDn, enviroment.adPassword, (err) => {
        if (err) {
          response.message = String(err)
          response.success = false
          response.status_code = 400
          return reject(response)
        };
        resolve(response);
        });
    }).catch((res:ResponseMessageDto)=>{
      return res
    });

    return new Promise((resolve,reject)=>{
      for (let index = 0; index < items.length; index++) {
        const sheetUser = items[index];
        if(sheetUser){
          const userName = sheetUser.email.split('@')
          ad.findUser(userName[0],async(error,user)=>{
            const adUserLogData:Prisma.ad_user_logCreateInput = {
              ticket:sheetUser.ticket,
              request_date:parseDateDDMMYYYY(sheetUser.request_date),
              name:sheetUser.name,
              lastname:sheetUser.lastname,
              dni:sheetUser.dni,
              contract_start_date:parseDateDDMMYYYY(sheetUser.contract_start_date),
              contract_end_date:parseDateDDMMYYYY(sheetUser.contract_end_date),
              display_name:sheetUser.display_name,
              email:sheetUser.email,
              password:sheetUser.password,
              audit_created_user:{connect:{id:1}},
              company:sheetUser.company,
              work_group_or_mailing_list:sheetUser.work_group_or_mailing_list,
              work_group_or_mailing_list2:sheetUser.work_group_or_mailing_list2,
              work_group_or_mailing_list3:sheetUser.work_group_or_mailing_list3,
              address:sheetUser.address,
              employee_id:sheetUser.employee_id,
              management_division:sheetUser.management_division,
              observation:sheetUser.observation,
              personal_email:sheetUser.personal_email,
              phone_number:sheetUser.phone_number,
              position:sheetUser.position,
              workplace:sheetUser.workplace,
              cost_center:sheetUser.cost_center,
              licensed_user:sheetUser.licensed_user==='1',
              ad_user:sheetUser.ad_user==='1'
            }
            if(error){
              adUserLogData.message = String(error)
              adUserLogData.status = 0
            }
            if(user){
              adUserLogData.message = "El usuario ya está registrado"
              adUserLogData.status = 0
            }else{
                const newUserDN = `CN=${sheetUser.name},OU=Empleados,OU=Usuarios,DC=${enviroment.adDc1},DC=${enviroment.adDc2}`;
                const newUser = {
                  cn: sheetUser.name, // Common Name (Nombre)
                  sn: sheetUser.lastname, // Surname (Apellido)
                  givenName: sheetUser.name, // Nombre de pila
                  displayName: sheetUser.display_name, // Nombre mostrado
                  name: `${sheetUser.name} ${sheetUser.lastname}`, // Nombre completo
                  department: sheetUser.management_division || "", // División/Gerencia
                  title: sheetUser.position || undefined, // Puesto
                  company: sheetUser.company || undefined, // Empresa
                  physicalDeliveryOfficeName: "STP", // Oficina/Lugar de trabajo
                  telephoneNumber: sheetUser.phone_number || undefined, // Teléfono corporativo
                  mobile: sheetUser.phone_number || undefined, // Celular
                  mail: sheetUser.email, // Correo electrónico
                  userPrincipalName: sheetUser.email, // Nombre principal del usuario (login)
                  sAMAccountName: sheetUser.email.split("@")[0], // Usuario de AD
                  streetAddress: sheetUser.employee_id || undefined, // Dirección física
                  postalCode:"", // Código postal (si existe)
                  c: "PE", // País
                  l: "", // Ciudad
                  st: "", // Estado o región
                  postOfficeBox:"Empleado",
                  facsimileTelephoneNumber:sheetUser.cost_center || "",
                  objectClass: ['top', 'person', 'organizationalPerson', 'user']
                };
                if(sheetUser.dni){
                  newUser.postalCode = `D${sheetUser.dni}`
                }
                if(sheetUser.workplace){
                  newUser.l = sheetUser.workplace
                }
                if(sheetUser.company){
                  newUser.st=sheetUser.company
                }
                await new Promise((resolve, reject) => {
                  client.add(newUserDN, newUser, (err) => {
                    if (err) {
                      adUserLogData.message = String(err)
                      adUserLogData.status = 0
                      return reject(err)
                    };
                    resolve(true);
                  });
                });
              adUserLogData.message = "Usuario registrado con exito"
              adUserLogData.status = 1
            }
            await prisma.ad_user_log.create({data:adUserLogData})
          })
        }
      }
      // client.unbind();
      resolve(response)
    })
  }
  async listCredentials() {
    const response = new ResponseListDto<ListCredentialDto>()
    const googleSheetData = await googleSheetService.readGoogleSheet("1PL1pzj2vtXYSmmcrBkGrkP0dmW2-Cvtc_qBlv2DGQdg", "send-emails", "A2:C999")
    if (googleSheetData) {
      response.items = googleSheetData.map(credential => {
        const personal_email = credential[0]
        const email = credential[1]
        const password = credential[2]
        return {
          personal_email,
          email,
          password
        }
      })
    }
    return response
  }
  async sendCredentials() {
    const response = new ResponseListDto()
    const credentialsResponse = await this.listCredentials()
    if (!credentialsResponse.success) return credentialsResponse
    if (credentialsResponse.items.length > 0) {
      for (let index = 0; index < credentialsResponse.items.length; index++) {
        const element = credentialsResponse.items[index];
        if (element) {
          const emailNodemailer = new EmailNodemailer({
            subject: "CORREO CORPORATIVO DE STRACON",
            to: element.personal_email,
            replyTo: "helpdesk@stracon.com",
            html: `<p>Buen día estimado(a),</p>
    
    <p>Nos complace informarle que su correo ha sido creado con éxito y las credenciales han sido enviadas:</p>
    
    <ul>
      <li><strong>Correo:</strong> ${element.email}</li>
      <li><strong>Contraseña:</strong> ${element.password}</li>
    </ul>
    
    <p>
      Recuerde realizar su cambio de clave después de su primer inicio de sesión y/o comunicarse con la Mesa de ayuda de Stracon en caso presente inconvenientes.
    </p>
    
    <p>Se adjunta el manual MFA para que pueda configurar su cuenta.</p>
    
    <p>Estamos disponibles para cualquier pregunta adicional que pueda tener. ¡Gracias!</p>
    
    <br/>
    
    <p><strong>Saludos cordiales.</strong></p>
    
    <small>
      <strong>Le recordamos que de no recibir comunicación alguna, el ticket se cerrará automáticamente en 3 días.</strong>
    </small>
    
    <br/><br/>
    
    <p><strong>Canales de atención:</strong></p>
    
    <p>
      Solicita requerimientos en: 
      <a href="https://stracon.sd.cloud.invgate.net/portal" target="_blank">
        https://stracon.sd.cloud.invgate.net/portal
      </a>
    </p>
    
    <p><i>Comunícate para reportar incidentes:</i></p>
      <p><i>Desde Perú al: (01) 6429946</i></p>
      <p><i>Desde Chile al: (+56) 223683079</i></p>
      <p><i>Desde Colombia al: (+57) 6014896855</i></p>
      <p><i>Correo para requerimiento e incidentes: helpdesk@stracon.com</i></p>
    <br/>
    
    <img src="https://www.stracon.com/site/media/stracon_logo.png" alt="Logo Stracon" style="height: 40px;" />
    `,
            from: "helpdesk@stracon.com",
            user: enviroment.outlookUser,
            password: enviroment.outlookPassword,
          })
          const sendEmailResponse = await emailNodemailer.send()
          response.items.push(sendEmailResponse)
        }
      }
    }
    return response
  }
}