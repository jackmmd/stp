import { errorMessages, successMessages } from "../constants/constants-messages";

export class ResponseMessageDto {
  success: boolean;
  message: string;
  status_code: number;
  constructor(
    success: boolean = true,
    message: string = successMessages.success,
    status_code: number = 200,
  ) {
    this.success = success;
    this.message = message;
    this.status_code = status_code
  }
  static internalServerError():ResponseMessageDto{
    return new ResponseMessageDto(false,errorMessages.internalServerError,500)
  }
  static badRequest(message?:string):ResponseMessageDto{
    return new ResponseMessageDto(false,message??errorMessages.badRequest,400)
  }
  static unauthorized(message?:string):ResponseMessageDto{
    return new ResponseMessageDto(false,message??errorMessages.unauthorized,401)
  }
  static forbidden(message?:string):ResponseMessageDto{
    return new ResponseMessageDto(false,message??errorMessages.forbidden,403)
  }
  static notFound(message?:string):ResponseMessageDto{
    return new ResponseMessageDto(false,message??errorMessages.notFound,404)
  }
}