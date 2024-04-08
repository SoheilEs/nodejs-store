const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken")
const redisClient = require("../utils/init_redis")
const { HomePageRoutes } = require("./api")
const { BlogRoutes } = require("./blog/blog.routes")
const { CategoryRoutes } = require("./category/category.routes")
const { DeveloperRoutes } = require("./developer/dev.routes")
const { UserAuthRoutes } = require("./user/auth.routes")
const router = require("express").Router()

router.use("/",HomePageRoutes)
router.use("/user",UserAuthRoutes)
router.use("/dev",DeveloperRoutes)
router.use("/category",VerifyAccessToken,checkRole("ADMIN"),CategoryRoutes)
router.use("/blog",VerifyAccessToken,checkRole("ADMIN"),BlogRoutes)

module.exports = {
    AllRoutes : router
}
