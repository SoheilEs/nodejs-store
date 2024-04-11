const dotenv = require("dotenv")
dotenv.config()
module.exports = {
  EXPIRES_IN: ()=>new Date().getTime() + 120000,
  ROLES: {
    USER:"USER",
    ADMIN:"ADMIN",
    AUTHOR:"AUTHOR",
    SUPPLIER:"SUPPLIER"
    
  },
  ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_SECRET_KEY

};

