const { userModel } = require("../../models/users");

async function checkLogin(req, res, next) {
  try {
    const token = req.signedCookies["authorization"];
    if (!token)
      return res.render("login.ejs", {
        error: "شما باید وارد حساب کاربری خود شوید",
      });
    const user = await userModel.findOne(
      { token },
      {
        basket: 0,
        otp: 0,
        password: 0,
        products: 0,
        __v: 0,
        bills: 0,
        courses: 0,
        discount: 0,
      }
    );
    if (!user)
      return res.render("login.ejs", {
        error: "کاربری یافت نشد",
      });
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
}
async function checkAccessLogin(req, res, next) {
  try {
    const token = req.signedCookies["authorization"];
    if (token) {
      const user = await userModel.findOne(
        { token },
        {
          basket: 0,
          otp: 0,
          password: 0,
          products: 0,
          __v: 0,
          bills: 0,
          courses: 0,
          discount: 0,
        }
      );
      if (user) {
        req.user = user;
        return res.redirect("/support");
      }
    }
    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  CheckLogin: checkLogin,
  CheckAcessLogin: checkAccessLogin,
};
