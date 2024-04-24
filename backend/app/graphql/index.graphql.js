const { GraphQLObjectType, GraphQLSchema} = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductsResolver } = require("./queries/products.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");

const RootQuery = new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        blogs: BlogResolver,
        products: ProductsResolver,
        categories: CategoryResolver,
        childOfCategory: CategoryChildResolver
    }
})

const RootMutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{

    }
})

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation:RootMutation
})


module.exports = {
    graphQLSchema
}