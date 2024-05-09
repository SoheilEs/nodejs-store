const autoBind = require("auto-bind");
const Controller = require("../../controller");
const PaymentService = require("./paymentGetway.service");
const { getBasketOfUser } = require("../../../../utils/function");
const createHttpError = require("http-errors");
const { default: axios } = require("axios");
const { StatusCodes } = require("http-status-codes");


class PaymentController extends Controller {
    #service
    constructor(){
        super()
        autoBind(this)
        this.#service = PaymentService
    }

    async paymentGetway(req,res,next){
        try{
            const user = req.user
            if(user.basket.course.length === 0 && user.basket.product.length ) throw createHttpError.BadRequest("سبد خرید شما خالی می باشد")
            const basket = (await getBasketOfUser(user._id))?.[0]
            if(!basket?.payDetail.paymentAmount) throw createHttpError.BadRequest("مشخصات پرداخت یافت نشد")
            const zarinpal_request_url = "https://gateway.zibal.ir/v1/request"
            const zarinpal_options = {
                merchant:"zibal",
                amount: basket?.payDetail.paymentAmount,
                description:"بابت خرید دوره یا محصولات",
                callbackUrl:"http://localhost:3400/verify",
                mobile: user.mobile,
                }
            
            const requestResult = await axios.post(zarinpal_request_url,zarinpal_options)
            const resultData = await requestResult.data
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    resultData
                }
            })
        }catch(error){
           
            next(error)
        }
    }
    async paymentGetwaVerify(req,res,next){
        try{
            return res.send("hello from verify")
        }catch(error){
            next(error)
        }
    }
}

module.exports = new PaymentController()