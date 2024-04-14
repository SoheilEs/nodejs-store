const Controller = require("../controller");
const createError =  require("http-errors")
module.exports = new class HomePageController extends Controller {
   async indexPage(req,res,next){
        try{
            return res.status(200).send("Store index page" + this.testMethod())
        }catch(error){
            next(createError.BadRequest(error.message))
        }
    }
}