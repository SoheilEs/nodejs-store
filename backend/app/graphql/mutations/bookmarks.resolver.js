const { GraphQLString } = require("graphql")
const { ResponseType } = require("../typeDefs/public.types");
const { productModel } = require("../../models/products");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { blogModel } = require("../../models/blogs");
const { courseModel } = require("../../models/course");

const bookmarkProduct = {
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
        let bookmarkProduct = await productModel.findOne({
            _id: product._id,
            bookmarks: user._id
        })
       
    
        const updateQuery = bookmarkProduct ? {$pull:{bookmarks:user._id}} : {$push:{bookmarks:user._id}}
        await productModel.updateOne({_id:product._id},updateQuery)
        let message;
        if(!bookmarkProduct){
        
            message = "محصول ذخیره شد"
        }else message = "ذخیره محصول لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const bookmarkBlog = {
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
        const bookmarkBlog = await blogModel.findOne({
            _id: blog._id,
            bookmarks: user._id
        })
       
        const updateQuery = bookmarkBlog ? {$pull:{bookmarks:user._id}} : {$push:{bookmarks:user._id}}
        await blogModel.updateOne({_id:blog._id},updateQuery)
        let message;
        if(!bookmarkBlog ){
            message = "ذخیره بلاگ انجام شد"
        }else message = "ذخیره بلاگ انجام لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}
const bookmarkCourse  = {
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
        const bookmarkCourse = await courseModel.findOne({
            _id: course._id,
            bookmarks: user._id
        })
        const updateQuery = bookmarkCourse ? {$pull:{bookamrks:user._id}} : {$push:{bookamrks:user._id}}
        await courseModel.updateOne({_id:course._id},updateQuery)
        let message;
        if(!bookmarkCourse){
            
            message = "ذخیره دوره انجام شد"
        }else message = "ذخیره دوره لغو شد"
        return{
            statusCode: StatusCodes.CREATED,
            data:{
                message
            }
        }
    }
}

module.exports={
    bookmarkProduct,
    bookmarkBlog,
    bookmarkCourse
}