const createError = require("http-errors");
const { PermissionsModel } = require("../../models/permission");
const { RoleModel } = require("../../models/role");
const { PERMISSIONS } = require("../../utils/constans");


const checkPermission = (requiredPermissions=[]) => {
    return async (req, res, next) => {
      try {
        
        const user = req.user;
        const allPermissions =[... new Set(requiredPermissions.flat(2))]
       
        
        const role = await RoleModel.findOne({title:user.Role})
        
        if(!role) throw createError.NotFound("کاربری با این نقش وجود ندارد")
        const permissions = await PermissionsModel.find({_id:{$in:role.permissions}})
      
        const userPermissions = permissions.map(item=>item.title)
      
        const hasPermission = allPermissions.every(permission=> userPermissions.includes(permission))
       
        if(userPermissions.includes(PERMISSIONS.ADMIN)) return next()
        if (requiredPermissions.length === 0 || hasPermission) return next();
        throw createError.Forbidden("شما به این قسمت دسترسی ندارید");
      } catch (err) {
        next(err);
      }
    };
  };


module.exports = {
  checkPermission
}

  