import { successMessages } from "../constants/constants-messages";
import { ResponseMessageDto } from "./response.message.dto";

export class ResponseListDto<T> extends ResponseMessageDto {
  total_count: number;
  items: T[];

  constructor(
    total_count: number = 0,
    items: T[] = [],
    success: boolean = true,
    message: string = successMessages.success,
    status_code:number = 200
  ) {
    super(success, message,status_code);
    this.total_count = total_count;
    this.items = items;
  }
}
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