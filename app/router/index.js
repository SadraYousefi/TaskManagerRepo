const { AuthRoutes } = require("./auth");
const { TaskRoutes } = require("./task");
const { PanelRoutes } = require("./panel");
const { verifyAccessToken } = require("../http/middleware/verifyAccessToken");
const { GroupRoutes } = require("./group");
const { DashboardRoutes } = require("./dashboard");
const { checkLogin } = require("../http/middleware/checkLogin");

const router = require("express").Router();
router.use("/" , DashboardRoutes)
router.use("/auth" , AuthRoutes)
router.use("/panel" , PanelRoutes)
router.use("/tasks"  , TaskRoutes)
router.use("/groups"  , GroupRoutes)

module.exports = {
    AllRoutes: router
}