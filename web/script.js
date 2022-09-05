function appendTodo(list, id, todoName, checked) {
    if (todoName) {
        list.innerHTML =
            `
        <li class="mdl-list__item" id="${id}">
            <span class="mdl-list__item-primary-content">
                <i class="material-icons  mdl-list__item-symbol">remove</i>
                ${todoName}
            </span>
            <span class="mdl-list__item-secondary-action">
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${id}">
                    <input type="checkbox" id="list-checkbox-${id}" class="mdl-checkbox__input" ${
                checked ? "checked" : ""
            } />
                </label>
                <label class="mdl-icon-toggle mdl-jsn-toggle l-js-ripple-effect" for="icon-toggle-${id}">
                    <i class="mdl-icon-toggle__label material-icons ln_todo_delete">delete</i>
                </label>
            </span>
        </li>
    ` + list.innerHTML;
    }
}

function addTodo1() {
    const id = uuidv4();
    appendTodo(todoList1, id, todofield1.value);

    let currentList = getLocalStorage("todos_1") || [];
    currentList.push({
        id: id,
        text: todofield1.value,
        checked: false,
    });
    setLocalStorage("todos_1", currentList);

    todofield1.value = "";
}

$("#todoList1").on("click", ".ln_todo_delete", function(e) {
    e.preventDefault();

    const item = $(this).closest("li.mdl-list__item");
    const id = item.attr("id");

    deleteTodoFromList("todos_1", id);

    item.remove();
});

function deleteTodoFromList(key, id) {
    let list = getLocalStorage(key);

    list = list.filter((item) => item.id !== id);

    setLocalStorage(key, list);
}

function addTodo2() {
    const id = uuidv4();
    appendTodo(todoList2, id, todofield2.value);

    let currentList = getLocalStorage("todos_2") || [];
    currentList.push({
        id: id,
        text: todofield2.value,
        checked: false,
    });
    setLocalStorage("todos_2", currentList);

    todofield2.value = "";
}

$("#todoList2").on("click", ".ln_todo_delete", function(e) {
    e.preventDefault();

    const item = $(this).closest("li.mdl-list__item");
    const id = item.attr("id");

    deleteTodoFromList("todos_2", id);

    item.remove();
});

function deleteTodoFromList(key, id) {
    let list = getLocalStorage(key);

    list = list.filter((item) => item.id !== id);

    setLocalStorage(key, list);
}

function addTodo3() {
    const id = uuidv4();
    appendTodo(todoList3, id, todofield3.value);

    let currentList = getLocalStorage("todos_3") || [];
    currentList.push({
        id: id,
        text: todofield3.value,
        checked: false,
    });
    setLocalStorage("todos_3", currentList);

    todofield3.value = "";
}

$("#todoList3").on("click", ".ln_todo_delete", function(e) {
    e.preventDefault();

    const item = $(this).closest("li.mdl-list__item");
    const id = item.attr("id");

    deleteTodoFromList("todos_3", id);

    item.remove();
});

function deleteTodoFromList(key, id) {
    let list = getLocalStorage(key);

    list = list.filter((item) => item.id !== id);

    setLocalStorage(key, list);
}

function deletetodo1() {
    localStorage.removeItem("todos_1");
    document.getElementById("todoList1").innerHTML = "";
}

function deletetodo2() {
    localStorage.removeItem("todos_2");
    document.getElementById("todoList2").innerHTML = "";
}

function deletetodo3() {
    localStorage.removeItem("todos_3");
    document.getElementById("todoList3").innerHTML = "";
}

// Importiert
function getRandomId() {
    return Math.random().toString().substr(2, 9);
}

function uuidv4() {
    return getRandomId() + "_" + getRandomId();
}

const sel_title = document.getElementById("day");

function setTitle(sel_title, name) {
    sel_title.innerHTML = "To-Do List " + name;
    setLocalStorage("currentDay", name);
}

switch (new Date().getDay()) {
    case 0:
        setTitle(sel_title, "Sonntag");
        break;
    case 1:
        setTitle(sel_title, "Montag");
        break;
    case 2:
        setTitle(sel_title, "Dienstag");
        break;
    case 3:
        setTitle(sel_title, "Mittwoch");
        break;
    case 4:
        setTitle(sel_title, "Donnerstag");
        break;
    case 5:
        setTitle(sel_title, "Freitag");
        break;
    case 6:
        setTitle(sel_title, "Samstag");
        break;
}

/* ### Local Storage ### */
function getLocalStorage(key) {
    //return localStorage.getItem(key)
    return JSON.parse(localStorage.getItem(key)) || null;
}

function setLocalStorage(key, value, allowWarning) {
    try {
        //localStorage.setItem(key, value)
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        if (allowWarning && confirm(_L_ERROR_PRIVATE_MODE)) {
            //  deleteLocalStorage(key)
            window.location.reload();
        }
    }
}

function init(list, key) {
    const todos = getLocalStorage(key) || [];

    // for = For Schleife/For In Schleife
    for (let todo of todos) {
        appendTodo(
            document.getElementById(list),
            todo.id,
            todo.text,
            todo.checked
        );
    }
}

try {
    init("todoList1", "todos_1");
    init("todoList2", "todos_2");
    init("todoList3", "todos_3");
} catch {
    console.log("Es ist ein Fehler aufgetreten");
}