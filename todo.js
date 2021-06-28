// declaration
let form = document.getElementById("formid");
let inputTodo = document.getElementById("inputTodo");
let containerList = document.getElementById("containerList");
let addTask = document.getElementById("addtodo");

//todo array
let todos = JSON.parse(window.localStorage.getItem("todos")) || []; //{ task:write  isChange = false}

//function for local storage
function saveInlocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

//Render the todo list

function renderTodo(todos) {
  let todolist = "";
  todos.forEach((todo, index) => {
    todolist += `<li  id="${index}" ${
      todo.isChange ? 'class="completetask"' : ""
    }> 
      <span>${todo.task}</span>
      <button > Complete</button>
      <button >Delete</button> </li>`;
  });

  containerList.innerHTML = todolist;
}

// add task in todos and render it

function addTodo() {
  let temptodos = [...todos, { task: inputTodo.value, isChange: false }];
  todos = temptodos;
  renderTodo(todos);
  saveInlocalStorage(todos);
  inputTodo.value = "";
}

//funtionality of delete and complete ;

function handleList(event) {
  let todoid = Number(event.target.parentNode.getAttribute("id"));
  if (event.target.outerText === "Delete") {
    todos = todos.filter((item, index) => index != todoid);
    renderTodo(todos);
    saveInlocalStorage(todos);
  } else if (event.target.outerText === "Complete") {
    todos = todos.map((item, index) => {
      if (index === todoid) {
        return { ...item, isChange: true };
      } else return item;
    });
    renderTodo(todos);
    saveInlocalStorage(todos);
  }
}

function registerEvent() {
  addTask.addEventListener("click", addTodo);
  containerList.addEventListener("click", handleList);
}

registerEvent();
renderTodo(todos);
