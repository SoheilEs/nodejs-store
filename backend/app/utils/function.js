const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const { userModel } = require("../models/users");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_KEY } = require("./constans");
const redisClient = require("./init_redis");
const fs = require("fs");
const path = require("path");
const randomNumberGen = () => {
  return Math.floor(Math.random() * 90000 + 10000);
};
const signAccessToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1h",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطای سمت سرور رخ داده است"));
      resolve(token);
    });
  });
};
const signRfreshToken = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_TOKEN_KEY, options, async (err, token) => {
      if (err)
        reject(createError.InternalServerError("خطای سمت سرور رخ داده است"));
      await redisClient.SETEX(user._id.valueOf(),(365*24*60*60),token)
      resolve(token);
    });
  });
};
const VerifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_KEY, async (error, payload) => {
      if (error) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await userModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken = await redisClient.GET(user._id.valueOf());
      if (token === refreshToken) resolve(user.mobile);
      reject(createError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد"));
    });
  });
};

const deleteFile = (fileAddress) =>{
  if(fileAddress){
    const pathFile = path.join(__dirname,"..","..","public",fileAddress)
    if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile)

  }
  
}


module.exports = {
  randomNumberGen,
  signAccessToken,
  signRfreshToken,
  VerifyRefreshToken,
  deleteFile,
};
