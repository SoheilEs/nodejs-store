const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType } = require("./public.types");

const CategoryType = new GraphQLObjectType({
    name:"CategoriesType",
    fields:{
        _id:{type: GraphQLString},
        title: {type: GraphQLString},
        children:{type: new GraphQLList(publicCategoryType)}
    }
})

module.exports = {
    CategoryType
}