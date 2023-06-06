const createHttpError = require("http-errors")
const joi = require("joi")
const createUserValidation = joi.object({
    firstName: joi.string().min(2).max(10).error(new createHttpError.BadRequest("first name should be 2 char or 10 max")),
    lastName: joi.string().min(2).max(15).error(new createHttpError.BadRequest("last name should be 2 char or 15 max")),
    email: joi.string().email().error(new createHttpError.BadRequest("Email is not valid")) ,
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new createHttpError.BadRequest("Password must Contain 8 char at least 1 number 1 string")),
    confirmPassword: joi.ref("password")
})

const userLoginValidation = joi.object({
    email: joi.string().email().error(new createHttpError.BadRequest("Email is not valid")) ,
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).error(new createHttpError.BadRequest("Password must Contain 8 char at least 1 number 1 string")),
})

module.exports = {
    createUserValidation,
    userLoginValidation,
}