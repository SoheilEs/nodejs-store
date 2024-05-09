const { checkPermission } = require("../http/middlewares/permission.guard");
const {
  VerifyAccessToken,
} = require("../http/middlewares/verifyAccessToken");
const { PERMISSIONS } = require("../utils/constans");
const { PermissionRoutes } = require("./RBAC/permission.routes");
const { RoleRoutes } = require("./RBAC/role.routes");

const { HomePageRoutes } = require("./api");
const { BlogRoutes } = require("./blog/blog.routes");
const { CategoryRoutes } = require("./category/category.routes");
const { CourseRoutes } = require("./course/course.routes");
const { DeveloperRoutes } = require("./developer/dev.routes");
const { ProductRoutes } = require("./product/product.routes");
const { UserAuthRoutes } = require("./user/auth.routes");
const { UserRoutes } = require("./user/user.routes");
const router = require("express").Router();
const {graphqlHTTP} = require("express-graphql")

const { graphqlConfig } = require("../utils/graphql.config");
const { PaymentRoutes } = require("./api/paymentGetway/payment.routes");
const { SupportRouts } = require("./support/support.routes");


router.use("/", HomePageRoutes);
router.use("/user", UserAuthRoutes);
router.use("/dev", DeveloperRoutes);
router.use("/category",VerifyAccessToken,checkPermission([PERMISSIONS.CONTENT_MANAGER]),CategoryRoutes);
router.use("/blog", VerifyAccessToken,checkPermission([PERMISSIONS.ADMIN,PERMISSIONS.CONTENT_MANAGER,PERMISSIONS.TEACHER]) ,BlogRoutes);
router.use("/product", VerifyAccessToken,checkPermission([PERMISSIONS.SUPPLIER,PERMISSIONS.CONTENT_MANAGER]),ProductRoutes);
router.use("/courses", VerifyAccessToken,checkPermission([PERMISSIONS.COURSE]) ,CourseRoutes);
router.use("/users",VerifyAccessToken,UserRoutes)
router.use("/roles",VerifyAccessToken,RoleRoutes)
router.use("/permissions",VerifyAccessToken,PermissionRoutes)
router.use("/graphql",graphqlHTTP(graphqlConfig))
router.use("/payment",PaymentRoutes)
router.use("/support",SupportRouts)


module.exports = {
  AllRoutes: router,
};
