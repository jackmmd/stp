import { Router } from "express";
import { adUserRoutes } from "../ad-users/ad-user.routes";
import { adUserLogRoutes } from "../ad-users-logs/ad-user-log.routes";

const appRoutes = Router()

appRoutes.get('/', (req, res) => {
    res.json({
      name:"Canvia - Stracon Core Api",
      version:"1.0.0",
      author:"https://github.com/jackmmd"
    });
  });
  
appRoutes.use('/ad-users/',adUserRoutes)
appRoutes.use('/ad-user-logs',adUserLogRoutes)
export { appRoutes }