const darkModeBtn = document.getElementById("darkModeBtn");
const taskForm = document.getElementById("taskform");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(taskInput.value.trim()===""){
        alert("Please enter a task")
        return;
    }
    const li=document.createElement("li");
    const span=document.createElement("span");
    span.innerText=taskInput.value
    const editBtn=document.createElement("button")
    editBtn.innerText="✏️Edit"
    editBtn.classList.add("editBtn")

    editBtn.addEventListener("click",()=>{
        const newTask=prompt("Edit Task:",span.innerText);
        if(newTask!==null && newTask.trim()!==""){
            span.innerText=newTask
        }
    })

    const completeBtn=document.createElement("button");
    completeBtn.innerText="✅ Complete"
    completeBtn.classList.add("completeBtn")
    completeBtn.addEventListener("click",()=>{
         span.classList.toggle("done");
        if(completeBtn.innerText==="✅ Complete"){
            completeBtn.innerText="↩️ Undo"
        }
        else{
            completeBtn.innerText="✅ Complete";
        }

    })


    const dltBtn=document.createElement("button")
    dltBtn.innerText="🗑️ Delete"
    dltBtn.classList.add("deleteBtn")
    dltBtn.addEventListener("click",()=>{
        li.remove()
    })
    li.appendChild(span)
    li.appendChild(editBtn)
    li.appendChild(completeBtn)
    li.appendChild(dltBtn)
    taskList.appendChild(li)
    taskInput.value=""
})

darkModeBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-mode")
})
