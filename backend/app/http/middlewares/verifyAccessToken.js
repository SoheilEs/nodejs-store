const createError = require("http-errors");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const { userModel } = require("../../models/users");
const JWT = require("jsonwebtoken");

const getToken = (headers) => {
  const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && ["bearer", "Bearer"].includes(bearer)) return token;
  throw createError.Unauthorized(
    "حساب کاربری شناسایی نشد. وارد حساب کاربری خود شوید"
  );
};

const VerifyAccessToken = (req, res, next) => {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (error, payload) => {
     try{
      if (error) throw createError.Unauthorized("وارد حساب کاربری خود شوید");
      const { mobile } = payload || {};
      const user = await userModel.findOne(
        { mobile: mobile },
        { password: 0, otp: 0 }
      );
      if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");
      req.user = user;
      return next();
     }catch(err){
        next(err)
     }
    });
  } catch (err) {
    next(err);
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    try {
      const user = req.user;
      if (user.role.includes(role)) return next();
      throw createError.Forbidden("شما به این قسمت دسترسی ندارید");
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  VerifyAccessToken,
  checkRole,
};
