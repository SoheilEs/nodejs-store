const { Schema, models, model, Types } = require("mongoose");

const RoleSchema = new Schema({
    title: {type: String, unique: true},
    description: {type: String, default: ""},
    permissions: {type: [Types.ObjectId], ref : 'permission', default: []}
},{versionKey:false})
const RoleModel = models.Role || model("Role",RoleSchema)

module.exports = {
    RoleModel
}