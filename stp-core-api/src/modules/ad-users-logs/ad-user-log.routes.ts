import { Router } from "express";
import { AdUserLogController } from "./ad-user-log.controller";

const adUserLogRoutes = Router()
const adUserLogController = new AdUserLogController()
adUserLogRoutes.post('/list',adUserLogController.list)
export { adUserLogRoutes }