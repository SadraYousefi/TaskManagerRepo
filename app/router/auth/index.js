const router = require("express").Router();

const {create , list , login, checkValidation} = require("../../http/controller/auth/user.controller");
const { verifyAccessToken } = require("../../http/middleware/verifyAccessToken");

router.post("/create" , create) ;
router.get("/list" , list) ;
router.post("/login" , login)


module.exports = {
    AuthRoutes: router
}