import { Request, Response } from "express";
import { ResponseListDto } from "../../others/dto/response.list.dto";
import { AdUserLogService } from "./ad-user-log.service";
const adUserLogService = new AdUserLogService()
export class AdUserLogController {
  async list(req: Request, res: Response) {
    try {
      const response = await adUserLogService.list()
      res.status(response.status_code).json(response)

    } catch (error) {
      const response = ResponseListDto.internalServerError()
      res.status(response.status_code).json(response)
    }
  }
}