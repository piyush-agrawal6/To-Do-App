const taskInput = document.querySelector(".task-input input");
const addTask = document.querySelector(".add");
const todoList = document.querySelector(".task-box");
const clearAll = document.querySelector(".clear-btn");

// input form setup

taskInput.onkeyup = () => {
  let userTask = taskInput.value.trim();
  if (userTask != 0) {
    addTask.classList.add("active");
  } else {
    addTask.classList.remove("active");
  }
};
showTasks();

// getting local storage on clicking add button

addTask.addEventListener("click", () => {
  let userTask = taskInput.value.trim();
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArray = [];
  } else {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorage);
  }
  listArray.push(userTask);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
});

// function for adding tasks in todolist

function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorage);
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li class="task">
         <label for="">
           <p> ${element} </p>
         </label>
         <div class="settings">
           <i class="fa-solid fa-ellipsis"></i>
           <ul class="task-menu">
             <li><i class="fa-solid fa-pen"></i>Edit</li>
             <li onclick="deleteTask(); "><i class="fa-solid fa-trash"></i>Delete</li>
           </ul>
         </div>
       </li>`;
  });
  todoList.innerHTML = newLiTag;
  taskInput.value = "";
  const taskRemain = document.querySelector(".pendingTask");
  taskRemain.innerHTML = listArray.length;
}

// deleting task fucntion

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorage);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

// deleting all tasks at once function

clearAll.addEventListener("click", () => {
  listArray = [];
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
});
