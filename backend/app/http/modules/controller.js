const autoBind = require("auto-bind");

module.exports = class Controller {
    constructor(){
        autoBind(this)
    }
    testMethod(req,res,next){
        return res.send("Test String")
    }
}