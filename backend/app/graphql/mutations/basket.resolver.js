const { GraphQLString, GraphQLInt } = require("graphql")
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken")
const { ResponseType } = require("../typeDefs/public.types")
const { checkExistProduct, checkExistCourse } = require("./comments.resolver")
const { userModel } = require("../../models/users")
const { StatusCodes } = require("http-status-codes")
const createHttpError = require("http-errors")



const addProductToBasket = {
    type: ResponseType,
    args:{
        productID :{type: GraphQLString},
    },
    resolve:async(_,args,context)=>{
        const{productID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req)
        const product = await checkExistProduct(productID)
        const productInBasket = await findProductInBasket(user._id,product._id)
        if(productInBasket){
            await userModel.updateOne({
                _id: user._id,
                "basket.product.productID":product._id
            },{
                $inc:{
                    "basket.product.$.count":1
                }
            })
        }else{
            await userModel.updateOne({
                _id: user._id,
                
            },{
                $push:{
                    "basket.product":{
                        productID:product._id,
                        count:1
                    }
                }
            })
        }
        return{
            statusCode: StatusCodes.OK,
            data:{
                message:"محصول با موفقیت به سبد خرید اضافه شد"
            }
        }

    }
}

const addCourseToBasket = {
    type: ResponseType,
    args:{
        courseID:{type: GraphQLString},
    },
    resolve:async(_,args,context)=>{
        const{courseID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req)
        const course = await checkExistCourse(courseID)
        const userCourse = await userModel.findOne({_id: user._id,courses: courseID})
        if(userCourse) throw createHttpError.BadRequest("این دوره قبلا خریداری شده است")
        const courseInBasket = await findCourseInBasket(user._id,course._id)
        if(courseInBasket){
            throw createHttpError.BadRequest("این دوره قبلا به سبد خرید اضافه شده است")
        }else{
            await userModel.updateOne({
                _id: user._id,
                
            },{
                $push:{
                    "basket.course":{
                        courseID:course._id,
                        count:1
                    }
                }
            })
        }
        return{
            statusCode: StatusCodes.OK,
            data:{
                message:"دوره با موفقیت به سبد خرید اضافه شد"
            }
        }

    }
}

const removeProductFromBasket = {
    type: ResponseType,
    args:{
        productID :{type: GraphQLString},
    },
    resolve:async(_,args,context)=>{
        const{productID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req)
        const product = await checkExistProduct(productID)
        
        const productInBasket = await findProductInBasket(user._id,product._id)
        
        if(!productInBasket) throw createHttpError.NotFound("محصولی در سبد وجود ندارد")
        if(productInBasket.basket.product[0].count > 1){
            await userModel.updateOne({
                _id: user._id,
                "basket.product.productID":product._id
            },{
                $inc:{
                    "basket.product.$.count": -1
                }
            })
        }else{
            await userModel.updateOne({
                _id: user._id,
                "basket.product.productID":product._id
            },{
                $pull:{
                    "basket.product":{
                        productID:product._id,
                    }
                }
            })
        }
        return{
            statusCode: StatusCodes.OK,
            data:{
                message:"محصول از سبد خرید حذف گردید"
            }
        }
      

    }
}

const removeCourseFromBasket = {
    type: ResponseType,
    args:{
        courseID:{type: GraphQLString},
    },
    resolve:async(_,args,context)=>{
        const{courseID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req)
        const course = await checkExistCourse(courseID)
        const courseInBasket = await findCourseInBasket(user._id,course._id)
        if(!courseInBasket) throw createHttpError.NotFound("دروه ای در سبد خرید وجود ندارد")
        if(courseInBasket.basket.course[0].count > 1){
            await userModel.updateOne({
                _id: user._id,
                "basket.course.courseID":course._id
            },{
                $inc:{
                    "basket.course.$.count":-1
                }
            })
        }else{
            await userModel.updateOne({
                _id: user._id,
                "basket.course.courseID":course._id
            },{
                $pull:{
                    "basket.course":{
                        courseID:course._id,
                    }
                }
            })
        }
        return{
            statusCode: StatusCodes.OK,
            data:{
                message:"دوره از سبد خرید حذف شد"
            }
        }

    }
}



const findProductInBasket = async (userID,productID) =>{
    const basketProduct = await userModel.findOne({
        _id:userID,
        "basket.product.productID":productID
    },{
        "basket.product.$":1
    })
    
    return basketProduct
}

const findCourseInBasket = async(userID,courseID)=>{
    const basketCourse = await userModel.findOne({
        _id:userID,
        "basket.course.courseID": courseID
    },{
        "basket.course.$":1
    })
    return basketCourse
}

module.exports = {
    addProductToBasket,
    addCourseToBasket,
    removeCourseFromBasket,
    removeProductFromBasket
}