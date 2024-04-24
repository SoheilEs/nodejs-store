const { GraphQLObjectType,GraphQLString, GraphQLList } = require("graphql")

const AuthorType = new GraphQLObjectType({
    name: "AuthorType",
    fields:{
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        mobile:{type: GraphQLString},
    }
})
const publicCategoryType = new GraphQLObjectType({
    name: "publicCategoryType",
    fields:{
        _id:{type: GraphQLString},
        title: {type: GraphQLString},
    }
})


module.exports = {
    AuthorType,
    publicCategoryType,
}