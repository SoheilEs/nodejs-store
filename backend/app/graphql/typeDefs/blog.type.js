const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { AuthorType, publicCategoryType } = require("./public.types");

const BlogType = new GraphQLObjectType({
    name: "blogType",
    fields:{
        _id:{ type: GraphQLString},
        author: {type: AuthorType},
        title: { type: GraphQLString},
        short_text: { type: GraphQLString},
        text: { type: GraphQLString},
        image: { type: GraphQLString},
        imageURL: { type: GraphQLString},
        tags: { type:new GraphQLList(GraphQLString)},
        category: { type: publicCategoryType},
       
    }
})

module.exports = {
    BlogType
}