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
      await redisClient.SETEX(user._id.valueOf(), 365 * 24 * 60 * 60, token);
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

const deleteFile = (fileAddress) => {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
};

const listOfimagesFromRequest = (files, fileUploadPath) => {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
};

const copyObject = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const setFeatures = (body) => {
  const { colors, width, weight, height, length } = body;
  let features = {};
  features.colors = colors;
  if (!isNaN(+weight) || !isNaN(+width) || !isNaN(+height) || !isNaN(+length)) {
    if (!width) features.width = 0;
    else features.weight = width;
    if (!height) features.height = 0;
    else features.height = height;
    if (!length) features.length = 0;
    else features.length = length;
    if (!weight) features.weight = 0;
    else features.weight = weight;
  }
  return features;
};

const deleteInvalidPropertyInObject = (data = {}, blackListFields = []) => {
  let nullishData = ["", " ", null, undefined, NaN, 0, "0"];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] === "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    if (Array.isArray(data[key]) && data[key].length === 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
};

module.exports = {
  randomNumberGen,
  signAccessToken,
  signRfreshToken,
  VerifyRefreshToken,
  deleteFile,
  listOfimagesFromRequest,
  copyObject,
  setFeatures,
  deleteInvalidPropertyInObject,
};
