const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { publicCategoryType, AuthorType } = require("./public.types");


const FeaturesType = new GraphQLObjectType({
    name:"FeaturesType",
    fields:{
        length:{type:GraphQLString},
        height: {type:GraphQLString},
        width:{type:GraphQLString},
        weight:{type:GraphQLString},
        colors:{type: new GraphQLList(GraphQLString)},
        model:{type: new GraphQLList(GraphQLString)},
        madeIn:{type:GraphQLString},
    }
})

const ProductType = new GraphQLObjectType({
    name:"ProductType",
    fields:{
        title: { type: GraphQLString},
        short_text: { type: GraphQLString},
        text: { type: GraphQLString},
        images: { type: new GraphQLList(GraphQLString)},
        imagesURL:{type: new GraphQLList(GraphQLString)},
        tags:{type: new GraphQLList(GraphQLString)},
        category:{type: publicCategoryType},
        price:{type: GraphQLInt},
        discount:{type: GraphQLInt},
        count:{type: GraphQLInt},
        type:{type: GraphQLString}, // virtual( online tutorilas: Node course, Python course) - physical(sells: book, bag ....)
        format:{type: GraphQLString},
        supplier:{type: AuthorType},
        features:{type: FeaturesType}
    }
})

module.exports = {
    ProductType
}