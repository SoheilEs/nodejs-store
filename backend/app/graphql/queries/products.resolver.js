const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../typeDefs/products.type");
const { productModel } = require("../../models/products");

const ProductsResolver = {
  type: new GraphQLList(ProductType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { category } = args;
    const findQuery = category ? { category } : {};
    return await productModel
      .find(findQuery)
      .populate([
        { path: "category" },
        {
          path: "supplier",
          select: ["first_name", "last_name", "mobile", "email"],
        },
        { path: "likes" },
        { path: "dislikes" },
        { path: "bookmarks" },
      ]);
  },
};

module.exports = {
  ProductsResolver,
};
