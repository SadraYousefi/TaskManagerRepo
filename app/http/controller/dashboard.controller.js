const { PrismaClient } = require("@prisma/client");
const fetch = require("node-fetch");
const prisma = new PrismaClient();
async function loginPage(req, res, next) {
  res.render("login.ejs", { errors: undefined, success: undefined });
}
async function dashboard(req, res, next) {
  try {
    const tasks = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { tasks: true },
    });
    res.render("taskdashboard.ejs" , {tasks:tasks.tasks , errors:undefined});
  } catch (error) {
    next(error);
  }
}
async function updateTask(req , res ,next ){
  let {taskId} = req.params
  const task = await prisma.task.findUnique({where:{id:+taskId}})
  const groups = await prisma.user.findUnique({where:{id:req.user.id} , select:{groups:true}})
  res.render("updateTask.ejs" , {taskId , groups:groups.groups , task , errors:undefined})
}
function registerPage(req, res, next) {
  res.render("register.ejs", { errors: undefined });
}

async function addTask(req , res , next) {
  const groups = await prisma.user.findUnique({where:{id:req.user.id} , select:{groups:true}})
  res.render("addTask.ejs" , {groups:groups.groups})
}
function addGroup(req,res,next){
  res.render("addGroup.ejs")
}
async function groupList(req,res,next){
  const groups = await prisma.user.findUnique({where:{id:req.user.id} , select: {groups:true}})
  console.log(groups.groups[0].title);
  res.render("groupList.ejs" , {groups: groups.groups , errors:undefined})
}
async function editGroup(req,res,next){
  const {groupId} = req.params
  res.render("editGroup.ejs" , {groupId})
}
module.exports = {
  loginPage,
  dashboard,
  registerPage,
  addTask,
  addGroup ,
  groupList,
  editGroup,
  updateTask
};
