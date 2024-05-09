const autoBind = require("auto-bind");
const Controller = require("../controller");

class MessageController extends Controller {
    constructor(){
        super()
        autoBind(this)
    }
}


module.exports = new MessageController()