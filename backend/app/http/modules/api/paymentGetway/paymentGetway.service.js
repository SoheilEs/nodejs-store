const autoBind = require("auto-bind");

class PaymentService {
    #model
    constructor(){
        autoBind(this)
    }
}

module.exports = new PaymentService()