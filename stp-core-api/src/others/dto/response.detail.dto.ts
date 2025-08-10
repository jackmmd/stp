import { successMessages } from "../constants/constants-messages";
import { ResponseMessageDto } from "./response.message.dto";
export class ResponseDetailDto<T> extends ResponseMessageDto {
  data: T | null;
  constructor(
    data: T | null = null,
    success: boolean = true,
    message: string = successMessages.success,
    status_code:number = 200
  ) {
    super(success, message,status_code);
    this.data = data;
  }
}