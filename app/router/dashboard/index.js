const { loginPage, dashboard , registerPage , addTask, addGroup, groupList, editGroup, updateTask } = require("../../http/controller/dashboard.controller")
const { checkLogin, loginPageAccess  } = require("../../http/middleware/checkLogin")
const { verifyAccessToken } = require("../../http/middleware/verifyAccessToken")

const router = require("express").Router()

router.get("/" , loginPageAccess ,loginPage)
router.get("/register" ,loginPageAccess , registerPage)
router.get("/dashboard" , checkLogin , dashboard)
router.get("/addTask" , checkLogin ,addTask)
router.get("/addGroup" , checkLogin , addGroup)
router.get("/groupList" , checkLogin , groupList)
router.get("/editGroup/:groupId" , checkLogin , editGroup)
router.get("/updateTask/:taskId" , checkLogin,updateTask)

router.get("/logout" , (req , res , next)=> {
    res.clearCookie('authorization')
    res.redirect("/")
})
module.exports = {
    DashboardRoutes: router
}