const router = require("express").Router();
const { createTask , getUserTasks , updateTask, removeTask, isDoneChanger } = require("../../http/controller/task.controller");
const { checkLogin } = require("../../http/middleware/checkLogin");

router.post("/create",checkLogin , createTask)
router.get("/list" ,checkLogin ,getUserTasks)
router.post("/update/:taskId" , checkLogin,updateTask)
router.post("/isDoneChanger/:id" , isDoneChanger)
router.post("/delete/:taskId" , checkLogin, removeTask)
module.exports = {
    TaskRoutes: router
}
