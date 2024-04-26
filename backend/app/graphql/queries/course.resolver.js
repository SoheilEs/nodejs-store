const { GraphQLList, GraphQLString } = require("graphql");
const { courseModel } = require("../../models/course");
const { CourseType } = require("../typeDefs/course.type");




const CourseResolver = {
  type: new GraphQLList(CourseType),
  args:{
    category:{type: GraphQLString}
  },
  resolve: async (_,args)=>{ 
    const {category} = args
    const findQuery = category ? {category}:{}

    return await courseModel.find(findQuery).populate([{path:"teacher"},{path:"category"}])
}
};

module.exports = {
  CourseResolver,
};