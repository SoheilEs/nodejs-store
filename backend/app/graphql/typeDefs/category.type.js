const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType, AnyType } = require("./public.types");

const CategoryType = new GraphQLObjectType({
    name:"CategoriesType",
    fields:{
        _id:{type: GraphQLString},
        title: {type: GraphQLString},
        children:{type: new GraphQLList(AnyType)}
    }
})

module.exports = {
    CategoryType
}