const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");
const { publicCategoryType, UserType } = require("./public.types");
const { CommentType } = require("./comments.type");


const EpisodeType = new GraphQLObjectType({
  name: "EpisodeType",
  fields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    type: { type: GraphQLString },
    time: { type: GraphQLString },
    videoAddress: { type: GraphQLString },
    vidoeURL: { type: GraphQLString },
  },
});

const ChapterType = new GraphQLObjectType({
  name: "ChaperType",
  fields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    episodes: { type: new GraphQLList(EpisodeType) },
  },
});

const CourseType = new GraphQLObjectType({
  name: "CourseType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    image: { type: GraphQLString },
    imagesURL: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: publicCategoryType },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString }, // virtual( online tutorilas: Node course, Python course) - physical(sells: book, bag ....)
    format: { type: GraphQLString },
    teacher: { type: UserType },
    srudents: { type: UserType },
    status: { type: GraphQLString },
    chapters: { type: new GraphQLList(ChapterType) },
    imageURL: { type: GraphQLString },
    totalTime: { type: GraphQLString },
    comments:{type: new GraphQLList(CommentType)},
    likes:{type: new GraphQLList(UserType)},
    dislikes:{type: new GraphQLList(UserType)},
    bookmarks:{type: new GraphQLList(UserType)},
  },
});

module.exports = {
  CourseType,
};
