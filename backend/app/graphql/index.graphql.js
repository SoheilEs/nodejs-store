const { GraphQLObjectType, GraphQLSchema} = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductsResolver } = require("./queries/products.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CommentResolver, createCommentForCourses, createCommentForProduct } = require("./queries/comments.resolver");

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        blogs: BlogResolver,
        products: ProductsResolver,
        categories: CategoryResolver,
        childOfCategory: CategoryChildResolver,
        courses: CourseResolver,
    }
})

const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        createCommentForBlog: CommentResolver,
        createCommentForCourses,
        createCommentForProduct
    }
})

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation:RootMutation
})


module.exports = {
    graphQLSchema
}