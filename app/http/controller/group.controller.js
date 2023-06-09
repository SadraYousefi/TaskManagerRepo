const { PrismaClient } = require("@prisma/client");
const createHttpError = require("http-errors");
const httpStatus = require("http-status");
const { deleteInvalidObjectData } = require("../../utils/functions");
const prisma = new PrismaClient();

async function createGroup(req, res, next) {
  try {
    const { title } = req.body;
    const createdGroup = await prisma.group.create({
      data: {
        title,
        authorId: req.user.id,
      },
    });
    if (!createdGroup)
      throw new createHttpError.InternalServerError("Group didn't created");
    res.redirect("/groupList");
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function updateGroup(req, res, next) {
  try {
    const groups = await prisma.user.findUnique({where: {id:req.user.id} , select:{groups:true}})
    let { groupId } = req.params;
    groupId = +groupId;
    let data = req.body;
    data = deleteInvalidObjectData(data, ["title"]);
    const group = await findGroupById(groupId);
    if (req.user.id != group.authorId)
      return res.render("grouplist.ejs" , {errors:"You cant edit this group" , groups:groups.groups})
    const updated = await prisma.group.update({ where: { id: groupId }, data });
    if (!updated)
      return res.render("grouplist.ejs" , {errors:"group didn't modified !" , groups:groups.groups}) 
      res.redirect("/grouplist")
  } catch (error) {
    next(error);
  }
}

async function listOfUserGroups(req, res, next) {
  try {
    const groups = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { groups: true },
    });
    res.status(httpStatus.OK).json({
      success: true,
      data: {
        groups,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function removeGroup(req, res, next) {
  try {
    const groups = await prisma.user.findUnique({where: {id:req.user.id} , select:{groups:true}})
    let { groupId } = req.params;
    groupId = +groupId;
    const group = await findGroupById(groupId);
    console.log(req.user.id);
    if (req.user.id != group.authorId){
      return res.render("grouplist.ejs", {errors: "You are not owner of this group to delete it" , groups:groups.groups})
    }
    const tasks = await prisma.task.findMany({where: {groupId:group.id}})
    if(tasks.length>0) return res.render("grouplist.ejs", {errors: "this group has active tasks you cant delete it" , groups:groups.groups})  
    const deleted = await prisma.group.delete({ where: { id: group.id } });
    if (!deleted) return res.render("grouplist.ejs", {errors: "this group has active tasks you cant delete it" , groups:groups.groups})
    res.redirect("/grouplist")
  } catch (error) {
    next(error);
  }
}


async function findGroupById(groupId) {
  const group = await prisma.group.findUnique({ where: { id: groupId } });
  if (!group)
    throw new createHttpError.NotFound("no group founded with this id");
  return group;
}
module.exports = {
  createGroup,
  updateGroup,
  listOfUserGroups,
  removeGroup ,
};
