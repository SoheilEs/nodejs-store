const { GraphQLList, GraphQLString } = require("graphql")
const { categoryModel } = require("../../models/categories")
const { CategoryType } = require("../typeDefs/category.type")

const CategoryResolver = {
    type: new GraphQLList(CategoryType),

    resolve : async () => {
      
        return await categoryModel.find({parent: undefined})
    }
}

const CategoryChildResolver = {
    type: new GraphQLList(CategoryType),
    args:{
        parent : { type: GraphQLString}, 
    },
    resolve : async (_, args) => {
        const{parent}= args 
        return await categoryModel.find({parent})
    }
}

module.exports = {
    CategoryResolver,
    CategoryChildResolver
}