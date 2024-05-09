const { GraphQLString } = require("graphql");

const { blogModel } = require("../../models/blogs");
const createError = require("http-errors");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");

const { isValidObjectId } = require("mongoose");
const { courseModel } = require("../../models/course");
const { productModel } = require("../../models/products");

const CommentResolver = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    blogID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const { comment, blogID, parent } = args;
    const user = await VerifyAccessTokenInGraphQL(context.req);
    if (!isValidObjectId(blogID))
      throw createError.BadRequest("شناسه بلاگ نامعتبر است");
    const blog = await checkExistBlog(blogID);

    if (parent && isValidObjectId(parent)) {
      const commentDoc = await getComment(blogModel, parent);
      if (commentDoc && !commentDoc.openToComment)
        throw createError.BadRequest("ثبت پاسخ مجاز نیست");
      const createAnswerResult = await blogModel.updateOne(
        {
          "comments._id": parent,
        },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment:false
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount)
        throw createError.InternalServerError("پاسخ ثپت نشد");
      return {
        statusCode: StatusCodes.CREATED,
        data:{
            message:"پاسخ با موفقیت ثبت گردید"
        }
      };
    } else {
      await blogModel.updateOne(
        { _id: blog._id },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              openToComment: true
              
            },
          },
        }
      );
    }

    return {
      statusCode: StatusCodes.CREATED,
      data: {
        message: " نظر شما ثبت گردید پس از تایید در سایت قرار می گیرد",
      },
    };
  },
};

const createCommentForProduct = {
    type: ResponseType,
    args: {
      comment: { type: GraphQLString },
      productID: { type: GraphQLString },
      parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
      const { comment, productID, parent } = args;
      const user = await VerifyAccessTokenInGraphQL(context.req);
      if (!isValidObjectId(productID))
        throw createError.BadRequest("شناسه محصول نامعتبر است");
      const product = await checkExistProduct(productID);

      if (parent && isValidObjectId(parent)) {
          console.log("====");
        const commentDoc = await getComment(productModel, parent);
        if (commentDoc && !commentDoc.openToComment)
          throw createError.BadRequest("ثبت پاسخ مجاز نیست");
        const createAnswerResult = await productModel.updateOne(
          {
            "comments._id": parent,
          },
          {
            $push: {
              "comments.$.answers": {
                comment,
                user: user._id,
                show: false,
                openToComment:false
              },
            },
          }
        );
        if (!createAnswerResult.modifiedCount)
          throw createError.InternalServerError("پاسخ ثپت نشد");
        return {
          statusCode: StatusCodes.CREATED,
          data:{
              message:"پاسخ با موفقیت ثبت گردید"
          }
        };
      } else {
        await productModel.updateOne(
          { _id: product._id },
          {
            $push: {
              comments: {
                comment,
                user: user._id,
                show: false,
                openToComment: true
                
              },
            },
          }
        );
      }
  
      return {
        statusCode: StatusCodes.CREATED,
        data: {
          message: " نظر شما ثبت گردید پس از تایید در سایت قرار می گیرد",
        },
      };
    },
  };


const createCommentForCourses = {
    type: ResponseType,
    args: {
      comment: { type: GraphQLString },
      courseID: { type: GraphQLString },
      parent: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
      const { comment, courseID, parent } = args;
      const user = await VerifyAccessTokenInGraphQL(context.req);
      if (!isValidObjectId(courseID))
        throw createError.BadRequest("شناسه بلاگ نامعتبر است");
      const course = await checkExistCourse(courseID);
  
      if (parent && isValidObjectId(parent)) {
        const commentDoc = await getComment(courseModel, parent);
        if (commentDoc && !commentDoc.openToComment)
          throw createError.BadRequest("ثبت پاسخ مجاز نیست");
        const createAnswerResult = await courseModel.updateOne(
          {
            "comments._id": parent,
          },
          {
            $push: {
              "comments.$.answers": {
                comment,
                user: user._id,
                show: false,
                openToComment:false
              },
            },
          }
        );
        if (!createAnswerResult.modifiedCount)
          throw createError.InternalServerError("پاسخ ثپت نشد");
        return {
          statusCode: StatusCodes.CREATED,
          data:{
              message:"پاسخ با موفقیت ثبت گردید"
          }
        };
      } else {
        await courseModel.updateOne(
          { _id: course._id },
          {
            $push: {
              comments: {
                comment,
                user: user._id,
                show: false,
                openToComment: true
                
              },
            },
          }
        );
      }
  
      return {
        statusCode: StatusCodes.CREATED,
        data: {
          message: " نظر شما ثبت گردید پس از تایید در سایت قرار می گیرد",
        },
      };
    },
  };


const checkExistBlog = async (id) => {
  const blog = await blogModel.findById(id);
  if (!blog) throw createError.NotFound("بلاگی بافت نشد");
  return blog;
};
const checkExistCourse = async (id) => {
    const course = await courseModel.findById(id);
    if (!course) throw createError.NotFound("دوره ای بافت نشد");
    return course;
  };
const checkExistProduct = async (id) => {
    const product = await productModel.findById(id);
    if (!product) throw createError.NotFound("محصولی بافت نشد");
    return product;
  };

const getComment = async (model, id) => {
    
  const comment = await model.findOne(
    { "comments._id": id },
    { "comments.$": 1 }
  );
  
  if (!comment) throw createError.NotFound("نظری یافت نشد ");
  return comment.comments[0];
};

module.exports = {
  CommentResolver,
  createCommentForProduct,
  createCommentForCourses,
  checkExistCourse,
  checkExistProduct
};
