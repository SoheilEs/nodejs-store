const autoBind = require("auto-bind");
const { userModel } = require("../../../../../models/users");
const { EXPIRES_IN, ROLES } = require("../../../../../utils/constans");
const createError = require("http-errors");
const {
  signAccessToken,
  VerifyRefreshToken,
  signRfreshToken,
} = require("../../../../../utils/function");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async saveUser(mobile, code) {
    const user = await this.checkExistUser(mobile);

    const now = new Date().getTime();
    let otp = {
      code,
      expiresIn: EXPIRES_IN(),
    };
    if (!user) {
      return !!(await this.#model.create({
        mobile,
        otp,
        Role: ROLES.USER,
      }));
    }
    if (user.otp.expiresIn > now)
      throw createError.Conflict("کد قبلی ارسال شده منقضی نشده است");

    user.otp = otp;
    await user.save();
    return !!user;
  }
  async checkOtp(mobile, code) {
    const user = await this.checkExistUser(mobile);
    if (!user) throw createError.NotFound("شماره موبایل یا کاربری یافت نشد");
    if (user.otp.code !== +code)
      throw createError.Unauthorized("کد وارد شده صحیح نمی باشد");
    const now = Date.now();
    if (user.otp.expiresIn < now)
      throw createError.Unauthorized("کد وارد شده منقضی شده است");
    const accessToken = await signAccessToken(user._id);
    const newRefreshToken = await signRfreshToken(user._id);
    return {
      accessToken,
      newRefreshToken,
    };
  }
  async sendRefreshToken(refreshToken) {
    const mobile = await VerifyRefreshToken(refreshToken);
    const user = await this.checkExistUser(mobile);
    const accessToken = await signAccessToken(user._id);
    const newRefreshToken = await signRfreshToken(user._id);
    return {
      accessToken,
      newRefreshToken,
    };
  }
  async checkExistUser(mobile) {
    const user = await this.#model.findOne({ mobile });
    return user;
  }
  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if ([null, "", NaN, "0", 0, undefined, " "].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await this.#model.updateOne(
      { mobile },
      {
        $set: objectData,
      }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = new AuthService();
