import { Response,Request } from "express";
import { AdUserService } from "./ad-user.service";
import { ResponseMessageDto } from "../../others/dto/response.message.dto";
import { ResponseListDto } from "../../others/dto/response.list.dto";
const adUserService = new AdUserService()
export class AdUserController {
  async list(req: Request, res: Response){
    const { username } = req.body
    try {
      const response = await adUserService.list({
        username
      })
      res.status(response.status_code).json(response)
    } catch (error) {
      const response = ResponseMessageDto.internalServerError()
      res.status(response.status_code).json(response)
    }
  }
  async listSheets(req: Request, res: Response){
    try {
      const response = await adUserService.listSheets()
      res.status(response.status_code).json(response)
    } catch (error) {
      const response = new ResponseListDto()
      res.status(response.status_code).json(response)
    }
  }
  async createSheets(req: Request, res: Response){
    try {
      const response = await adUserService.createSheets()
      res.status(response.status_code).json(response)
    } catch (error) {
      const response = new ResponseListDto()
      res.status(response.status_code).json(response)
    }
  }
  async sendCredentials(req: Request, res: Response) {
    try {
      const response = await adUserService.sendCredentials()
      res.status(response.status_code).json(response)
    } catch (error) {
      const response = ResponseMessageDto.internalServerError()
      res.status(response.status_code).json(response)
    }
  }
  async listCredentials(req: Request, res: Response) {
    try {
      const response = await adUserService.listCredentials()
      res.status(response.status_code).json(response)
    } catch (error) {
      const response = ResponseMessageDto.internalServerError()
      res.status(response.status_code).json(response)
    }
  }
}