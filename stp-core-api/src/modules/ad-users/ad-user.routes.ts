import { Router } from "express";
import { AdUserController } from "./ad-user.controller";

const adUserRoutes = Router()
const adUserController = new AdUserController()
adUserRoutes.post('/list',adUserController.list)
adUserRoutes.post('/list-sheets',adUserController.listSheets)
adUserRoutes.post('/create-sheets',adUserController.createSheets)
adUserRoutes.post('/send-credentials',adUserController.sendCredentials)
adUserRoutes.get('/list-credentials',adUserController.listCredentials)

export { adUserRoutes }