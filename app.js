let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editId = null;

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const todoText = input.value.trim();
  if (todoText.length <= 2) return;

  if (editId) {
    todos.push({ id: editId, todo: todoText, isCompleted: false });
    editId = null;
  } else {
    todos.push({ id: Date.now().toString(), todo: todoText, isCompleted: false });
  }
  input.value = "";
  saveToLocalStorage();
  renderTodos();
}

function toggleCheckbox(id) {
  const index = todos.findIndex(t => t.id === id);
  todos[index].isCompleted = !todos[index].isCompleted;
  saveToLocalStorage();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveToLocalStorage();
  renderTodos();
}

function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  document.getElementById("todoInput").value = todo.todo;
  todos = todos.filter(t => t.id !== id);
  editId = id;
  renderTodos();
}

function renderTodos() {
  const showFinished = document.getElementById("showFinished").checked;
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = "<p><strong>No todos to display</strong></p>";
    return;
  }

  todos.forEach(item => {
    if (!showFinished && item.isCompleted) return;

    const div = document.createElement("div");
    div.className = "todo";

    const left = document.createElement("div");
    left.innerHTML = `
      <input type="checkbox" ${item.isCompleted ? "checked" : ""} onchange="toggleCheckbox('${item.id}')"/>
      <span class="${item.isCompleted ? "line-through" : ""}"> ${item.todo}</span>
    `;

    const right = document.createElement("div");
    right.innerHTML = `
      <button class="btn btn-edit" onclick="editTodo('${item.id}')">Edit</button>
      <button class="btn btn-delete" onclick="deleteTodo('${item.id}')">Delete</button>
    `;

    div.appendChild(left);
    div.appendChild(right);
    todoList.appendChild(div);
  });
}

renderTodos();
