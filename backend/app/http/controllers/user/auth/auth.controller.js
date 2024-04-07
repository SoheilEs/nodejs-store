const autoBind = require("auto-bind");
const { randomNumberGen } = require("../../../../utils/function");
const { getOtpSchema,checkOtpSchema } = require("../../../validators/users/auth.schema");
const Controller = require("../../controller");
const createError = require("http-errors");
const authService = require("./auth.service");

module.exports = new (class AuthController extends Controller {
  #service;
  constructor() {
    super();
    autoBind(this);
    this.#service = authService;
  }
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumberGen();
      const result = await this.#service.saveUser(mobile, code);
      if (!result) throw createError.Unauthorized("ورود شما انجام نشد");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "کد اعتبارسنجی با موفقیت برای شما ارسال شد.",
          code,
          mobile,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req,res,next){
    try{
      await checkOtpSchema.validateAsync(req.body)
      const {mobile, code} = req.body
      const data = await this.#service.checkOtp(mobile,code)
      return res.json({
        data
      })
    }catch(error){
      next(error)
    }
  }
  async sendRefreshToken(req, res, next){
    try{
      const {refreshToken} = req.body
      const data = await this.#service.sendRefreshToken(refreshToken)
      return res.json({
        data
      })
    }catch(error){
      next(error)
    }
  }
})();
