import nodemailer from "nodemailer";
import { ResponseMessageDto } from "../../../others/dto/response.message.dto";
import { successMessages } from "../../../others/constants/constants-messages";
interface TEmailNodemailer {
  from: string
  user:string
  password:string
  to: string
  subject: string,
  html: string,
  replyTo?: string
}

export class EmailNodemailer {
  user:string
  password:string
  to: string
  from: string
  subject: string
  html: string
  replyTo: string
  constructor({ from, to, subject, html, replyTo="no-reply@stracon.com",user,password }: TEmailNodemailer) {
    this.user = user
    this.password = password
    this.from = from
    this.to = to
    this.subject = subject
    this.html = html
    this.replyTo = replyTo
  }
  async send():Promise<ResponseMessageDto> {
    const response = new ResponseMessageDto()
    try {
      const transporter = nodemailer.createTransport({
        host:"smtp.office365.com",
        port:587,
        secure: false,
        auth: {
          user: this.user,
          pass: this.password,
        },
      });

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject: this.subject,
        html: this.html.toString(),
        replyTo: this.replyTo,
        attachments: [            
          {
            filename: "Guia MFA 1.pdf",
            path: "guia-mfa-1.pdf"
          }
        ]
      };

      await transporter.sendMail(mailOptions);
      response.message = successMessages.success
      response.success = true
      return response;
    } catch (error) {
      console.log(error)
      const response = ResponseMessageDto.badRequest(String(error))
      return response
    }
  }
} 