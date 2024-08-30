let toDoInput = document.getElementById("toDoInput"); //where the user enters the content of the task
let errorInfo = document.getElementById("errorInfo"); //info about no tasks / necessity to enter text
let addBtn = document.getElementById("addBtn"); //ADD button - adds new items to the list
let ulList = document.getElementById("ulList"); //task list, such UL
let newToDo = document.getElementById("newToDo"); //newly added li, new task
let popup = document.getElementById("popup");
let popupInfo = document.getElementById("popupInfo");
let todoToEdit = document.getElementById("todoToEdit"); //edited Todo
let popupInput = document.getElementById("popupInput"); //input popup
let popupAddBtn = document.getElementById("popupAddBtn "); //the 'approve' button in the popup
let popupCloseBtn = document.getElementById("popupCloseBtn "); //the 'cancel' button in the popup

const main = () => {
  //calls our functions
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  // fetch all items
  toDoInput = document.querySelector(".todo-input");
  errorInfo = document.querySelector(".error-info");
  addBtn = document.querySelector(".btn-add");
  ulList = document.querySelector(".todolist ul");

  popup = document.querySelector(".popup");
  popupInfo = document.querySelector(".popup-info");
  popupInput = document.querySelector(".popup-input");
  popupAddBtn = document.querySelector(".accept");
  popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  // broadcast
  addBtn.addEventListener("click", addNewToDo);
  ulList.addEventListener("click", checkClick);
  popupCloseBtn.addEventListener("click", closePopup);
  popupAddBtn.addEventListener("click", changeTodoText);
  toDoInput.addEventListener("keyup", enterKeyCheck);
};

const addNewToDo = () => {
  // create a new toDo
  if (toDoInput.value != "") {
    newToDo = document.createElement("li");
    newToDo.textContent = toDoInput.value;
    //add may to our ToDo tools (buttons)
    createToolAreal();
    // add our ToDo to the ul list
    ulList.append(newToDo);

    // clean the error and input after adding ToDo
    toDoInput.value = "";
    errorInfo.textContent = "";
  } else {
    errorInfo.textContent = "Enter the content of the task!";
  }
};

const createToolAreal = () => {
  //create elements (buttons and add toDo)
  const div = document.createElement("div");
  div.classList.add("tools");
  // adding our tools to the new toDo
  newToDo.append(div);

  const buttonDone = document.createElement("button");
  buttonDone.classList.add("complete");
  buttonDone.innerHTML = '<i class="fas fa-check"></i>';

  const buttonEdit = document.createElement("button");
  buttonEdit.classList.add("edit");
  buttonEdit.textContent = "EDIT";

  const buttonCancel = document.createElement("button");
  buttonCancel.classList.add("delete");
  buttonCancel.innerHTML = '<i class="fas fa-times"></i>';

  // add elements together
  div.append(buttonDone, buttonEdit, buttonCancel);
};

//a function that checks what we click on (to know whether to end the task, delete or edit it)
const checkClick = (e) => {
  if (e.target.matches(".complete")) {
    e.target.closest("li").classList.toggle("completed"); //after clicking complete, add the completed class to the nearest li (grandfather) element
    e.target.classList.toggle("completed");
  } else if (e.target.matches(".edit")) {
    editToDo(e);
  } else if (e.target.matches(".delete")) {
    //else if because if we clicked anywhere except delete, the condition would also be executed
    deleteToDo(e);
  }
};

//popup functions
const editToDo = (e) => {
  todoToEdit = e.target.closest("li"); // edit the nearest li to the button (message B-))
  popupInput.value = todoToEdit.firstChild.textContent; // assign to the input (editor) the value we had in the child (text) of the li element
  popup.style.display = "flex";
};

const closePopup = () => {
  popup.style.display = "none";
  popupInfo.textContent = "";
};

//a function that makes changes from input to our li element

const changeTodoText = () => {
  if (popupInput.value != "") {
    todoToEdit.firstChild.textContent = popupInput.value;

    popup.style.display = "none";
    popupInfo.textContent = "";
  } else {
    popupInfo.textContent = "You must provide some content!";
  }
};

const deleteToDo = (e) => {
  e.target.closest("li").remove(); //style.display = 'none' as I originally thought it would also work but this better B-)

  // display missing items when they are missing
  const allToDos = ulList.querySelectorAll("li");
  if (allToDos.length == 0) {
    errorInfo.textContent = "There are no tasks in the list.";
  }
};

// also add todo on enter
const enterKeyCheck = (e) => {
  if (e.key == "Enter") {
    addNewToDo();
  }
};

//performed in the event of a change to the website
document.addEventListener("DOMContentLoaded", main);
