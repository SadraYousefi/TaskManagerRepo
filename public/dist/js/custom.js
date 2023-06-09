const myTask = document.getElementById("myTask")
const addTask = document.getElementById("addTask")
const addGroup = document.getElementById("addGroup")
const setting = document.getElementById("setting")
const logout = document.getElementById("logout")

myTask.style.cursor = "Pointer"
addTask.style.cursor = "Pointer"
addGroup.style.cursor = "Pointer"
setting.style.cursor = "Pointer"
logout.style.cursor = "Pointer"


myTask.addEventListener("click" , ()=> {
    window.location.replace("/")
})
addTask.addEventListener("click" , ()=> {
    window.location.replace("/addTask")
})
addGroup.addEventListener("click" , ()=> {
    window.location.replace("/addGroup")
})
setting.addEventListener("click" , ()=> {
    window.location.replace("/grouplist")
})
logout.addEventListener("click" , ()=> {
    window.location.replace("/logout")
})

async function checkMe(id) {
    const input = document.getElementById(id)
    let data = false
    if(input.checked){
         data = {isDone:true}
    } else {
         data = {isDone:false}
    }
    const result = await axios.post(`http://localhost:3000/tasks/isDoneChanger/${id}` , data)
    console.log(result);
}