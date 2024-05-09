const autoBind = require("auto-bind");
const Controller = require("../controller");

class SupportController extends Controller {
    constructor(){
        super()
        autoBind(this)
    }
    renderChatRoom(req,res,next){
        try{
            return res.render("chat.ejs")
        }catch(error){
            next(error)
        }
    }

}


module.exports = new SupportController()