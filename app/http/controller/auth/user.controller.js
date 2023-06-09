const createHttpError = require("http-errors");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
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
    const error = "Password Must contain at least 6 chars and password , confirm password must be same / first name and lastname should be at least 3 chars"
    createUserValidation.validateAsync(req.body).catch(err=> {
      return res.render("register.ejs" , {errors:error})
    })
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) return res.render("register.ejs" , {errors:error})
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        firstName, lastName, email , password:hashedPassword
      }
    })
    if (!newUser) return res.render("register.ejs" , {errors:"server error please try again"})
    res.render("login.ejs" , {errors:undefined ,success:"Your account created successfully"})
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    const Users = await prisma.user.findMany()
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
    userLoginValidation.validateAsync(req.body).catch( err => {
      return res.render("login.ejs" , {success: undefined , errors: "Email or password is invalid"})
    })
    const {email , password} = req.body
    const user = await prisma.user.findUnique({where: {email}})
    if(!user) return res.render("login.ejs" , {success: undefined , errors: "Email or password is wrong"})
    const verify = await confirmPassword(password , user.password)
    if(!verify) return res.render("login.ejs" , {success: undefined , errors: "Email or password is wrong"})
    const accessToken = await signJWT(email)
    if(!accessToken) return res.render("login.ejs" , {success: undefined , errors: "Server Error please try again"})
    await prisma.user.update({where:{id:user.id} , data: {token:accessToken}})
    res.cookie("authorization" , accessToken , {signed: true , httpOnly: true , expires: new Date(Date.now() + 1000*60*60)})
    return res.redirect("/dashboard")
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  list,
  login,
};
