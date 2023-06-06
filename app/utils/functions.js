const bcrypt = require("bcrypt")
const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")
const { ACCESS_TOKEN_PRIVATE_KEY } = require("./config")

async function hashPassword(password) { 
    return await bcrypt.hashSync(password , 10 )
}
async function confirmPassword(password , hashedPassword) {
    return bcrypt.compareSync(password , hashedPassword)
}

async function signJWT(email) {
    const payload = {email}
    const option = {expiresIn : '1h'}
    return jwt.sign(payload , ACCESS_TOKEN_PRIVATE_KEY , option)
}

module.exports = {
    hashPassword ,
    confirmPassword,
    signJWT ,
}