import {config} from 'dotenv'
config()
export const enviroment = {
  apiPort:process.env.API_PORT || 3000,
  apiPort2:process.env.API_PORT_2 || 4000,
  apiUrl:process.env.API_URL || "http://localhost:3000",
  clientUrl:process.env.CLIENT_URL || "http://localhost:5173",
  googleServiceAccountJson:process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "{}",
  outlookUser:process.env.OUTLOOK_USER || "",
  outlookPassword:process.env.OUTLOOK_PASSWORD || "",
  nodeEnv:process.env.NODE_ENV || "development",
  adDomain:process.env.AD_DOMAIN || "platzy.com",
  adUrl:process.env.AD_URL || "ldap://192.168.122.20",
  adBaseDn:process.env.AD_BASE_DN || "dc=platzy,dc=com",
  adUserName:process.env.AD_USERNAME || "Administrator@platzy.com",
  adPassword:process.env.AD_PASSWORD || "1234343",
  adDn:process.env.AD_DN || 'CN=Administrator,CN=Users,DC=platzy,DC=com',
  adDc1:process.env.AD_DC_1 || 'platzy',
  adDc2:process.env.AD_DC_2 || 'com',
};