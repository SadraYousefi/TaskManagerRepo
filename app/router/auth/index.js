const router = require("express").Router();

const {create , list , login, checkValidation} = require("../../http/controller/auth/user.controller");

router.post("/create" , create) ;
router.get("/list" , list) ;
router.post("/login" , login)


module.exports = {
    AuthRoutes: router
}