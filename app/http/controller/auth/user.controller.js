const createHttpError = require("http-errors");
const db = require("../../../sequelize/models/index");
const {
  createUserValidation,
  userLoginValidation,
} = require("../../validation/user");
const {
  hashPassword,
  confirmPassword,
  signJWT,
} = require("../../../utils/functions");
const httpStatus = require("http-status");

async function create(req, res, next) {
  try {
    await createUserValidation.validateAsync(req.body);
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    await checkUserWithEmail(email.toLowerCase());
    if (password != confirmPassword)
      throw new createHttpError.BadRequest(
        "password and confirm password are not same !"
      );
    const hashedPassword = await hashPassword(password);
    const newUser = await db.User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    console.log(newUser);
    if (!newUser)
      throw new createHttpError.InternalServerError("User didn't created");
    return res.status(httpStatus.OK).json({
      success: true,
      data: {
        msg: "user created successfully",
      },
    });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const Users = await db.User.findAll({});
    res.status(httpStatus.OK).json({
      success: true,
      data: {
        Users,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    await userLoginValidation.validateAsync(req.body)
    const {email , password} = req.body
    const user = await db.User.findOne({where: {email}})
    if(!user) throw new createHttpError.Unauthorized("email or password is wrong")
    const verify = await confirmPassword(password , user.password)
    if(!verify) throw new createHttpError.Unauthorized("email or password is wrong")
    const accessToken = await signJWT(email)
    if(!accessToken) throw new createHttpError.InternalServerError("Internal Server Error")
    res.status(httpStatus.OK).json({
        success: true, 
        data: {
            accessToken
        }
    })
  } catch (error) {
    next(error);
  }
}

async function checkUserWithEmail(email) {
  const user = await db.User.findOne({ where: { email } });
  if (user)
    throw new createHttpError.BadRequest("This email address is already exist");
}

module.exports = {
  create,
  list,
  login,
};
