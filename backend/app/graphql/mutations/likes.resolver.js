const { GraphQLString } = require("graphql")
const { ResponseType } = require("../typeDefs/public.types");
const { productModel } = require("../../models/products");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { blogModel } = require("../../models/blogs");
const { courseModel } = require("../../models/course");

const likeProduct = {
    type: ResponseType,
    args:{
        productID: {type:GraphQLString}
    },
    resolve: async(_,args,context)=>{
        const {productID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req);

        if(!isValidObjectId(productID)) throw createHttpError.BadRequest("شناسه محصول نادرست است")
        const product = await productModel.findById(productID)
        if(!product) throw createHttpError.NotFound("محصولی یافت نشد")
        let likedProduct = await productModel.findOne({
            _id: product._id,
            likes: user._id
        })
        let disLikedproduct = await productModel.findOne({
            _id: product._id,
            dislike : user._id
        })
    
        const updateQuery = likedProduct ? {$pull:{likes:user._id}} : {$push:{likes:user._id}}
        await productModel.updateOne({_id:product._id},updateQuery)
        let message;
        if(!likedProduct){
           if(disLikedproduct) await productModel.updateOne({_id:product._id},{$pull:{dislikes:user._id}})
            message ="محصول پسندیده شد"
        }else message = "پسندیدن محصول لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const likeBlog = {
    type:ResponseType,
    args:{
        blogID: {type:GraphQLString}
    },
    resolve:async(_,args,context)=>{
        const {blogID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req);
        if(!isValidObjectId(blogID)) throw createHttpError.BadRequest("شناسه محصول نادرست است")
        const blog = await blogModel.findById(blogID)
        if(!blog) throw createHttpError.NotFound("محصولی یافت نشد")
        let likedBlog = await blogModel.findOne({
            _id: blog._id,
            likes: user._id
        })
        let disLikedBlog = await blogModel.findOne({
            _id: blog._id,
            dislike : user._id
        })
        const updateQuery = likedBlog ? {$pull:{likes:user._id}} : {$push:{likes:user._id}}
        await blogModel.updateOne({_id:blog._id},updateQuery)
        let message;
        if(!likedBlog){
           if(disLikedBlog) await blogModel.updateOne({_id:blog._id},{$pull:{dislikes:user._id}})
            message = "پسندیدن بلاگ انجام شد"
        }else message = "پسندیدن بلاگ لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const likeCourse = {
    type:ResponseType,
    args:{
        courseID: {type:GraphQLString}
    },
    resolve: async(_,args,context)=>{
        const {courseID} = args
        const user = await VerifyAccessTokenInGraphQL(context.req);
        if(!isValidObjectId(courseID)) throw createHttpError.BadRequest("شناسه محصول نادرست است")
        const course = await courseModel.findById(courseID)
        if(!course) throw createHttpError.NotFound("محصولی یافت نشد")
        let likedCourse = await courseModel.findOne({
            _id: course._id,
            likes: user._id
        })
        let disLikedCourse = await blogModel.findOne({
            _id: course._id,
            dislike : user._id
        })
        const updateQuery = likedCourse ? {$pull:{likes:user._id}} : {$push:{likes:user._id}}
        await courseModel.updateOne({_id:course._id},updateQuery)
        let message;
        if(!likedCourse){
            if(disLikedCourse)await courseModel.updateOne({_id:course._id},{$pull:{dislikes:user._id}})
            message = "پسندیدن دوره انجام شد"
        }else message = "پسندیدن دوره لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}

module.exports={
    likeProduct,
    likeBlog,
    likeCourse
}