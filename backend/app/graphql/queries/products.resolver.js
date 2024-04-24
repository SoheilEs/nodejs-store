const { GraphQLList } = require("graphql");
const { ProductType } = require("../typeDefs/products.type");
const { productModel } = require("../../models/products");



const ProductsResolver = {
  type: new GraphQLList(ProductType),
  resolve: async ()=>{ 
    return await productModel.find({}).populate([{path:"category"},{path:"supplier",select:["first_name","last_name","mobile","email"]}])
}
};

module.exports = {
    ProductsResolver,
};