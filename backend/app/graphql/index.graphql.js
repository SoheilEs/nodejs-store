const { GraphQLObjectType, GraphQLSchema} = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductsResolver } = require("./queries/products.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CommentResolver, createCommentForCourses, createCommentForProduct } = require("./mutations/comments.resolver");
const { likeProduct, likeBlog, likeCourse } = require("./mutations/likes.resolver");
const { dislikeBlog, dislikeCourse, dislikeProduct } = require("./mutations/dislikes.resolver");
const { bookmarkProduct, bookmarkBlog, bookmarkCourse } = require("./mutations/bookmarks.resolver");
const { getBookmarkedProducts, getBookmarkedBolgs, getBookmarkedCourses, getUserBasket } = require("./queries/userProfile.resolver");
const { addCourseToBasket, addProductToBasket, removeProductFromBasket, removeCourseFromBasket } = require("./mutations/basket.resolver");

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        blogs: BlogResolver,
        products: ProductsResolver,
        categories: CategoryResolver,
        childOfCategory: CategoryChildResolver,
        courses: CourseResolver,
        getBookmarkedProducts,
        getBookmarkedBolgs,
        getBookmarkedCourses,
        getUserBasket

        
    }
})

const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createCommentForBlog: CommentResolver,
        createCommentForCourses,
        createCommentForProduct,
        likeProduct,
        likeBlog,
        likeCourse,
        dislikeBlog,
        dislikeCourse,
        dislikeProduct,
        bookmarkProduct,
        bookmarkBlog,
        bookmarkCourse,
        addCourseToBasket,
        addProductToBasket,
        removeProductFromBasket,
        removeCourseFromBasket
    }
})

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation:RootMutation
})


module.exports = {
    graphQLSchema
}