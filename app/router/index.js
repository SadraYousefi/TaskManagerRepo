const { AuthRoutes } = require("./auth");
const { TaskRoutes } = require("./task");
const { PanelRoutes } = require("./panel");

const router = require("express").Router();

router.use("/auth" , AuthRoutes)
router.use("/panel" , PanelRoutes)
router.use("/task" , TaskRoutes)

module.exports = {
    AllRoutes: router
}