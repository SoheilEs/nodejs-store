const { GraphQLList } = require("graphql");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { blogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");
const { productModel } = require("../../models/products");
const { courseModel } = require("../../models/course");
const { ProductType } = require("../typeDefs/products.type");
const { CourseType } = require("../typeDefs/course.type");
const { userModel } = require("../../models/users");
const { UserType, AnyType } = require("../typeDefs/public.types");
const { getBasketOfUser } = require("../../utils/function");

const getBookmarkedBolgs = {
    type:new GraphQLList(BlogType),
    resolve:async(_,args,context)=>{
        const user =await VerifyAccessTokenInGraphQL(context.req)
        
        const blogs = await blogModel.find({bookmarks: user._id}).populate([
            { path: "author" },
            { path: "category" },
            { path: "comments.user" },
            { path: "comments.answers.user" },
            { path: "likes" },
            { path: "dislikes" },
            { path: "bookmarks" },
            
          ])
         console.log(blogs);
        return blogs

    }
}
const getBookmarkedCourses = {
    type:new GraphQLList(CourseType),
    resolve:async(_,args,context)=>{
        const user =await VerifyAccessTokenInGraphQL(context.req)
        const courses = await courseModel.find({bookmarks: user._id}).populate([
            { path: "teacher" },
            { path: "category" },
            { path: "likes" },
            { path: "dislikes" },
            { path: "bookmarks" },
          ]);
        return courses

    }
}
const getBookmarkedProducts = {
    type:new GraphQLList(ProductType),
    resolve:async(_,args,context)=>{
        const user =await VerifyAccessTokenInGraphQL(context.req)
        const products = await productModel.find({bookmarks: user._id}).populate([
            { path: "category" },
            {
              path: "supplier",
              select: ["first_name", "last_name", "mobile", "email"],
            },
            { path: "likes" },
            { path: "dislikes" },
            { path: "bookmarks" },
          ]);
        return products

    }
}


const getUserBasket = {
    type: AnyType,
    resolve:async(_,args,context)=>{
        const user =await VerifyAccessTokenInGraphQL(context.req)
        const userDetail = await getBasketOfUser(user._id)
        return userDetail
    }
}
const getProductInBasket = {
    type:new GraphQLList(UserType),
    resolve:async(_,args,context)=>{
        const user =await VerifyAccessTokenInGraphQL(context.req)
        return await userModel.findOne({_id:user._id}).populate([{path:"basket"}])
    }
}
const getCourseInBasket = {
    type:new GraphQLList(UserType),
    resolve:async(_,args,context)=>{
        const user =await VerifyAccessTokenInGraphQL(context.req)
        return await userModel.findOne({_id:user._id}).populate([{path:"basket"}])
    }
}
module.exports = {
    getBookmarkedBolgs,
    getBookmarkedCourses,
    getBookmarkedProducts,
    getProductInBasket,
    getCourseInBasket,
    getUserBasket
}