import nodemailer from "nodemailer";
import { ResponseMessageDto } from "./response-message";
import { globalConstants } from "./global-constants";
interface TNodemailer {
  to: string;
  subject: string;
  html: string;
}

export class Nodemailer {
  to: string;
  subject: string;
  html: string;
  constructor({ to, subject, html }: TNodemailer) {
    this.to = to;
    this.subject = subject;
    this.html = html;
  }
  async send(): Promise<ResponseMessageDto> {
    const response = new ResponseMessageDto();
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: globalConstants.mailUsername,
          pass: globalConstants.mailPassword,
        },
      });

      const mailOptions = {
        from: globalConstants.mailUsername,
        to: this.to,
        subject: this.subject,
        html: this.html.toString(),
        replyTo: globalConstants.mailUsername,
      };

      await transporter.sendMail(mailOptions);
      
      response.success = true;
      return response;
    } catch (error) {
      const response = ResponseMessageDto.badRequest(String(error));
      return response;
    }
  }
}
