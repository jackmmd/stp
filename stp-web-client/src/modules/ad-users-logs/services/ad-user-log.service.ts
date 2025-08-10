import { api } from "@/services/api.service";

export class AdUserLogService {
  async list() {
    const { data } = await api.post('/ad-user-logs/list')
    return data
  }
}