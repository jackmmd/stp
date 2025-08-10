import type { ResponseListDto } from "@/others/dto/response.list.dto";
import { api } from "@/services/api.service";
import type { ListAdUserDto } from "../dto/list-ad-user.dto";
import type { ResponseMessageDto } from "@/others/dto/response.message.dto";
import type { ListAdSheetsUsersDto } from "../dto/list-ad-user-sheets.dto";

export class AdUserService {
  async list() {
    const { data } = await api.post<ResponseListDto<ListAdUserDto>>('/ad-users/list')
    return data
  }
  async listSheets(){
    const { data } = await api.post<ResponseListDto<ListAdSheetsUsersDto>>('/ad-users/list-sheets')
    return data
  }
  async createSheets(){
    const { data } = await api.post<ResponseMessageDto>('/ad-users/create-sheets')
    return data
  }
}