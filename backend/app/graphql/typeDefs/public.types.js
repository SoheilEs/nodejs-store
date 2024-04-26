const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLScalarType,
} = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
  name: "AnyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral,
});

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    mobile: { type: GraphQLString },
  },
});

const publicCategoryType = new GraphQLObjectType({
  name: "publicCategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});
const ResponseType = new GraphQLObjectType({
  name:"ResponseType",
  fields:{
      statusCode:{type: GraphQLString},
      data:{type: AnyType}
  }
})

module.exports = {
  UserType,
  publicCategoryType,
  AnyType,
  ResponseType
};
