const autoBind = require("auto-bind");
const Controller = require("../controller");

const { signAccessToken } = require("../../../utils/function");
const { userModel } = require("../../../models/users");


class SupportController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }
  renderChatRoom(req, res, next) {
    try {
      return res.render("chat.ejs");
    } catch (error) {
      next(error);
    }
  }
  loginForm(req, res, next) {
    try {
      return res.render("login.ejs", {
        error: undefined,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { mobile } = req.body;
      const user = await userModel.findOne({ mobile });
      if (!user)
        res.render("login.ejs", {
          error: "نام کاربری صحیح نمی باشد",
        });
      const token = await signAccessToken(user._id);
      user.token = token;
      user.save();
      res.cookie("authorization", token, {
        signed : true,
        httpOnly: true,
        _expires: new Date(Date.now() + 1000 * 60 * 60 * 1),
      });
      return res.redirect("/support");
    } catch (error) {
        console.log(error);
      next(error);
    }
  }
}

module.exports = new SupportController();
