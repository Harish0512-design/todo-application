// element references
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const todoTasks = document.querySelector("#todo-tasks");

// initialize tasks array
let allTasks = [];

// function to save tasks to local storage
const saveToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
};

// render tasks from local storage
const renderTasks = () => {
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    allTasks = JSON.parse(tasks);
    for (let taskobj of allTasks) {
      console.log(taskobj.dt);
      const html = `<div class="alert alert-primary" role="alert">
      <span>${taskobj.dt}</span><button id="${taskobj.id}" type="button" class="float-end btn btn-danger" onclick=deleteTask(${taskobj.id})>Delete</button>
      <p>${taskobj.task}</p>
    </div>`;
      todoTasks.insertAdjacentHTML("beforeend", html);
    }
  }
};

// add task to the local storage and also displays the task
const addTask = (event) => {
  event.preventDefault();
  const inputVal = todoInput.value;
  const dateTime = new Date().toLocaleString();
  if (inputVal.trim() !== "") {
    const idx = allTasks.length;
    tas = { id: idx, task: inputVal, dt: dateTime };
    allTasks.push(tas);
    const html = `<div class="alert alert-primary" role="alert">
    <span>${dateTime}</span><button id="${idx}" type="button" class="float-end btn btn-danger" onclick= deleteTask(${idx})>Delete</button>
    <p>${inputVal}</p>
  </div>`;
    todoTasks.insertAdjacentHTML("beforeend", html);
    saveToLocalStorage();
    todoInput.value = "";
  }
};

//deletes the task which means remove the parent node and make changes in local storage
const deleteTask = (index) => {
  const nodeToDelete = document.getElementById(index).parentNode;
  todoTasks.removeChild(nodeToDelete);
  allTasks.splice(index, 1);
  saveToLocalStorage();
};

//event handler to add task
addBtn.addEventListener("click", addTask);
renderTasks();
