const {graphQLSchema} = require("../graphql/index.graphql");

const graphqlConfig = (req,res)=> {
    return{
        schema:graphQLSchema,
        graphiql: true,
        context:{req,res}}
}

module.exports = {
    graphqlConfig
}