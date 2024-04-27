const { GraphQLString } = require("graphql")
const { ResponseType } = require("../typeDefs/public.types");
const { productModel } = require("../../models/products");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { blogModel } = require("../../models/blogs");
const { courseModel } = require("../../models/course");

const dislikeProduct = {
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
        let dislikedProduct = await productModel.findOne({
            _id: product._id,
            dislikes: user._id
        })
        let likedProduct = await productModel.findOne({
            _id: product._id,
            likes: user._id
        })
    
        const updateQuery = dislikedProduct ? {$pull:{dislikes:user._id}} : {$push:{dislikes:user._id}}
        await productModel.updateOne({_id:product._id},updateQuery)
        let message;
        if(!dislikedProduct){
           if(likedProduct) await productModel.updateOne({_id:product._id},{$pull:{likes:user._id}})
            message ="نپسندیدن محصول انجام شد"
        }else message = "نپسندیدن محصول لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const dislikeBlog = {
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
        let dislikedBlog = await blogModel.findOne({
            _id: blog._id,
            likes: user._id
        })
        let likedBlog = await blogModel.findOne({
            _id: blog._id,
            likes: user._id
        })
        const updateQuery = dislikedBlog ? {$pull:{dislikes:user._id}} : {$push:{dislikes:user._id}}
        await blogModel.updateOne({_id:blog._id},updateQuery)
        let message;
        if(!dislikedBlog){
           if(likedBlog) await blogModel.updateOne({_id:blog._id},{$pull:{likes:user._id}})
            message = "نپسندیدن بلاگ انجام شد"
            
        }else message = "نپسندیدن بلاگ لغو"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const dislikeCourse = {
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
        let dislikedCourse = await courseModel.findOne({
            _id: course._id,
            likes: user._id
        })
        let likedCourse = await courseModel.findOne({
            _id: course._id,
            likes: user._id
        })
        const updateQuery = dislikedCourse ? {$pull:{dislikes:user._id}} : {$push:{dislikes:user._id}}
        await courseModel.updateOne({_id:course._id},updateQuery)
        let message;
        if(!dislikedCourse){
            if(likedCourse) await courseModel.updateOne({_id:course._id},{$pull:{likes:user._id}})
            message = "نپسندیدن دوره انجام شد"
        }else message = "نپسندیدن دوره لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}

module.exports={
    dislikeProduct,
    dislikeBlog,
    dislikeCourse
}