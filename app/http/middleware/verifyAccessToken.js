const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_PRIVATE_KEY } = require("../../utils/config");
const createHttpError = require("http-errors");
const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

function verifyAccessToken(req, res, next) {
  const headers = req?.headers;
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if ((token, bearer?.toLowerCase() === "bearer")) {
    jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY, async (err, payload) => {
      if (err) return res.render("login.ejs" , {success: undefined , errors:"please login first"})
      const { email } = payload;
      const user = await prisma.user.findUnique({ where: { email } , select: {id:true , email:true} });
      if (!user)
      return res.render("login.ejs" , {success: undefined , errors:"please login first"})
      req.user = user;
      return next();
    });
  } else return res.render("login.ejs" , {success: undefined , errors:"please login first"})
}

module.exports = {
  verifyAccessToken,
};
