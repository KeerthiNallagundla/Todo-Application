let todosContainer = document.getElementById("todosContainer");
let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");

function getDataFromLocalStorge(){
    let stringifiedList = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringifiedList);
    if(parsedList === null){
        return [];
    }else {
        return parsedList;
    }
}

let todoList = getDataFromLocalStorge();

let todosCount = todoList.length;

function statusChange(inputId,labelId,todoId){
    let inputEle = document.getElementById(inputId);
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else {
        todoObject.isChecked = true;
    }
    
}

function deleteTodoItem(todoId){
    let todoEle = document.getElementById(todoId);
    todosContainer.removeChild(todoEle);

    let deleteIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else {
            return false;
        }
    });
    todoList.splice(deleteIndex,1);
}

addBtn.onclick = function(){
    onAddTodo();
}



function createAndAppend(todo){

    let inputId = "input" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let ListElement = document.createElement("li");
    ListElement.classList.add("d-flex","flex-row","p-2");
    ListElement.id = todoId;
    todosContainer.appendChild(ListElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = inputId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox")
    inputElement.onclick = function(){
        statusChange(inputId,labelId,todoId);
    }
    ListElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container","d-flex","flex-row");
    ListElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",inputId);
    labelElement.classList.add("label-text")
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");
    deleteIcon.onclick = function(){
        deleteTodoItem(todoId);
    }
    deleteContainer.appendChild(deleteIcon);
}

function onAddTodo(){
    let inputValue = document.getElementById("inputValue");
    let userInputValue = inputValue.value;
    if(userInputValue === ""){
        alert("Enter a valid input");
        return;
    }

    todosCount = todosCount + 1;
    let newTodo = 
        {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked : false
    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    inputValue.value = "";
}

saveBtn.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

for(let todo of todoList){
    createAndAppend(todo);
}

