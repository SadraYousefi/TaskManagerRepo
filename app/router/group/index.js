const router = require("express").Router();
const {
    createGroup ,
    updateGroup,
    listOfUserGroups,
    removeGroup
} = require("../../http/controller/group.controller");
const { checkLogin } = require("../../http/middleware/checkLogin");

router.get("/list" , listOfUserGroups)
router.post("/create" ,checkLogin ,createGroup)
router.post("/update/:groupId" , checkLogin,updateGroup)
router.get("/delete/:groupId" , checkLogin , removeGroup)

module.exports = {
    GroupRoutes: router
}