const dotenv = require("dotenv")
dotenv.config()
module.exports = {
  EXPIRES_IN: ()=>new Date().getTime() + 120000,
  ROLES:Object.freeze({
    USER:"USER",
    ADMIN:"ADMIN",
    AUTHOR:"AUTHOR",
    SUPPLIER:"SUPPLIER"
    
  }),
  PERMISSIONS:Object.freeze({
    USER:["profile"],
    ADMIN:"all",
    CONTENT_MANAGER:["course","blog","category","product"],
    TEACHER:["course","blog"],
    SUPPLIER:["product"],
    SUPERUSER:["all"],

    
  }),
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_SECRET_KEY,
  COOKIE_PARSER_SECRET: process.env.COOKIE_SECRET,

};

