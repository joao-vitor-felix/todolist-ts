const list = document.querySelector<HTMLUListElement>("#list")!;
const form = document.querySelector<HTMLFormElement>("#new-todo-form")!;
const input = document.querySelector<HTMLInputElement>("#todo-input")!;

type Todo = {
  id: string;
  name: string;
  isCompleted: boolean;
};

let todos = loadTodos();
todos.forEach(renderNewTodo);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (!value) {
    return;
  }

  const todo: Todo = {
    id: crypto.randomUUID(),
    name: value,
    isCompleted: false,
  };

  todos.push(todo);

  saveTodos();
  renderNewTodo(todo);

  input.value = "";
});

function renderNewTodo(todo: Todo) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");

  const label = document.createElement("label");
  label.classList.add("list-item-label");

  const checkbox = document.createElement("input");
  checkbox.classList.add("label-input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isCompleted;

  checkbox.addEventListener("change", () => {
    todo.isCompleted = checkbox.checked;
    saveTodos();
  });

  const textElement = document.createElement("span");
  textElement.classList.add("label-text");
  textElement.textContent = todo.name;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    listItem.remove();
    todos = todos.filter((_todo) => _todo.id !== todo.id);
    saveTodos();
  });

  label.append(checkbox, textElement);
  listItem.append(label, deleteButton);

  list.append(listItem);
}

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

function loadTodos() {
  const value = localStorage.getItem("todos");

  if (!value) {
    return [];
  }

  return JSON.parse(value) as Todo[];
}
