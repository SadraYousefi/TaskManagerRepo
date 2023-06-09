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

function deleteInvalidObjectData(data = {}, allowedFields = []) {
    const nullishData = ["", " ", 0, "0", null, undefined];
    Object.keys(data).forEach((key) => {
      if (!allowedFields.includes(key)) delete data[key];
      if (typeof data[key] == "string") data[key] = data[key].trim();
      if (Array.isArray(data[key]) && data[key].lenght > 0)
        data[key] = data[key].map((item) => item.trim());
      if (Array.isArray(data[key]) && data[key].lenght == 0) delete data[key];
      if (nullishData.includes(data[key])) delete data[key];
    });
    return data;
  }

module.exports = {
    hashPassword ,
    confirmPassword,
    signJWT ,
    deleteInvalidObjectData
}