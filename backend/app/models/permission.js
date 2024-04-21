const { Schema, models, model} = require("mongoose");

const PermissionSchema = new Schema({
    title: {type: String, unique: true},
    description: {type: String, default: ""}
}, {
    versionKey:false
})

const PermissionsModel = models.permission || model("permission",PermissionSchema)

module.exports = {
    PermissionsModel
}
