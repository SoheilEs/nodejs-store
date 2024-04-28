const { GraphQLList } = require("graphql");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { blogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");
const { productModel } = require("../../models/products");
const { courseModel } = require("../../models/course");
const { ProductType } = require("../typeDefs/products.type");
const { CourseType } = require("../typeDefs/course.type");

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

module.exports = {
    getBookmarkedBolgs,
    getBookmarkedCourses,
    getBookmarkedProducts
}