export class ResponseMessageDto {
  success: boolean;
  message: string;
  status_code: number;
  constructor(
    success: boolean = true,
    message: string = "Todo salió correctamente",
    status_code: number = 200,
    data: string = ""
  ) {
    this.success = success;
    this.message = message;
    this.status_code = status_code
  }
  static badRequest(message?:string):ResponseMessageDto{
    return new ResponseMessageDto(false,message??"Bad request",400)
  }
  static notFound(message?:string):ResponseMessageDto{
    return new ResponseMessageDto(false,message??"No encontrado",404)
  }
}