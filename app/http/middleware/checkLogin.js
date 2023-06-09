const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function checkLogin(req, res, next) {
  try {
    const token = req.signedCookies["authorization"];
    if (token) {
      const user = await prisma.user.findFirst({where:{token}})
      if (user) {
        req.user = user;
        next();
      }
    } else {
      return res.render("login.ejs", { success: undefined ,errors: "Please login first" });
    }
  } catch (error) {
    next(error);
  }
}
async function loginPageAccess(req, res, next) {
  try {
    const token = req.signedCookies["authorization"];
    if (token) {
      const user = await prisma.user.findFirst({where:{token}})
      if (user) {
        req.user = user
        return res.redirect("/dashboard")
      }
    } else {
      return next()
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
    checkLogin , 
    loginPageAccess
}