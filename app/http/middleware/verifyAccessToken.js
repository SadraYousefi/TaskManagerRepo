const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_PRIVATE_KEY } = require("../../utils/config");
const createHttpError = require("http-errors");
const db = require("../../sequelize/models");
function verifyAccessToken(req , res , next) {
    const headers = req?.headers
    const [bearer, token] = headers?.authorization?.split(" ") || [];
    if ((token, bearer?.toLowerCase() === "bearer")) {
        jwt.verify(token , ACCESS_TOKEN_PRIVATE_KEY , async(err , payload) => {
            if(err) throw new createHttpError.Unauthorized("Please login first !")
            const {email} = payload ;
            const user = await db.User.findOne({where: { email }}) ;
            if(!user) throw new createHttpError.InternalServerError("Please login first !")
            req.user = user
            return next();
        })
    } else return next(createHttpError.Unauthorized("please login first!"));
}

module.exports = {
    verifyAccessToken
}