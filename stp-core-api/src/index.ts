import express from 'express';
import morgan from 'morgan';
import { appRoutes } from './modules/app/app.routes';
import { enviroment } from './config/enviroment';
import cors from 'cors'
const app = express();

app.use(express.json());
app.use(morgan('dev'))
app.use(cors({origin:enviroment.clientUrl}))

app.use('/api/',appRoutes)

app.listen(enviroment.apiPort, () => {
  console.log(`Server listen on port http://localhost:${enviroment.apiPort}`);
});
