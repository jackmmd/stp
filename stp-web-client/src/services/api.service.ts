import axios from "axios";
import { enviroments } from '@/constants/enviroment' 
export const api = axios.create({
  baseURL: enviroments.apiUrl,
});