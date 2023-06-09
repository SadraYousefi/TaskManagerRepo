const createHttpError = require("http-errors");
const httpStatus = require("http-status");
const { PrismaClient } = require("@prisma/client");
const { deleteInvalidObjectData } = require("../../utils/functions");
const prisma = new PrismaClient();
async function createTask(req, res, next) {
  try {
    let { title, groupId , deadLine , status } = req.body;
    groupId = +groupId
    const user = req.user;
    const group = await prisma.group.findUnique({where: {id:groupId}})
    if(!group) throw new createHttpError.NotFound("There is no group with this id")
    if(user.id != group.authorId) throw new createHttpError.Unauthorized("You can't use groups that you didn't make them")
    const createTaskResult = await prisma.task.create({
      data: {
        title,
        deadLine,
        status,
        groupId,
        authorId: user.id,
      },
    });
    if (!createTaskResult)
      throw new createHttpError.InternalServerError(
        "Task Didn't created successfully"
      );
      res.redirect("/")
  } catch (error) {
    next(error);
  }
}

async function getUserTasks(req, res, next) {
  try {
    const tasks = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { tasks: true },
    });
    res.status(httpStatus.OK).json({
      success: true,
      data: {
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res, next) {
  try {
    const groups = await prisma.user.findUnique({where:{id:req.user.id} , select: {groups:true}})
    let { taskId } = req.params;
    taskId = +taskId;
    const task = await findTaskById(taskId);
    console.log(task);
    if (req.user.id != task.authorId)
      res.render("updateTask" , {taskId , groups:groups.groups , task , error:"You cant edit this task"})
    let data = req.body;
    data = deleteInvalidObjectData(data, [
      "title",
      "deadLine",
      "status",
      "groupId",
      "isDone",
    ]);
    data.groupId = Number(data.groupId)
    const updated = await prisma.task.update({ where: { id: task.id }, data });
    if (!updated)
      res.render("updateTask" , {taskId , groups:groups.groups , task , error:"Task Didnt updated"})
      res.redirect("/dashboard")
  } catch (error) {
    next(error);
  }
}
async function isDoneChanger(req,res,next){
  const {id} = req.params
  const data = req.body
  await prisma.task.update({where:{id:+id} , data})
  res.send("done")
}
async function removeTask(req, res, next) {
  try {
    let { taskId } = req.params;
    taskId = +taskId;
    const tasks = await prisma.user.findUnique({where:{id:req.user.id} , select: {tasks: true}})
    const task = await findTaskById(taskId);
    if (req.user.id != task.authorId) return res.render("taskdashboard.ejs" , {tasks:tasks.tasks , error:"You dont have permission to delete this task"})
    const deleted = await prisma.task.delete({ where: { id: task.id } });
    if (!deleted) return res.render("taskdashboard.ejs" , {tasks:tasks.tasks , error:"Internal server error please try again"})
    res.redirect("/dashboard")
  } catch (error) {
    next(error);
  }
}

async function findTaskById(taskId) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) throw new createHttpError.NotFound("Task didn't found");
  return task;
}

module.exports = {
  createTask,
  getUserTasks,
  updateTask,
  removeTask,
  isDoneChanger
};
