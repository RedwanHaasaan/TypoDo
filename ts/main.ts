import { Todo } from "./types.js";
//array to store todos
let todos: Todo[] = [];

//select elements
const form=document.querySelector<HTMLFormElement>('#todo-form');
const input=document.querySelector<HTMLInputElement>('#todo-input');
const todoList=document.querySelector<HTMLUListElement>('#todo-list');
const emptyState= document.querySelector<HTMLDivElement>('#empty-state');
//functions
function renderTodos(): void {
  if (!todoList) return;
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });
}
//create a todo element card
function createTodoElement(todo: Todo): HTMLLIElement {
  const li = document.createElement("li");
  li.className="flex gap-4 items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
  li.innerHTML=
        `<div class="flex items-center gap-3">
              <input
                type="checkbox"
                id="todo-checkbox"
                class="h-4 w-4 accent-blue-600 cursor-pointer"
                 ${todo.completed ? "checked" : ""}
              />

              <span class=${todo.completed ?"line-through text-slate-400":"font-medium text-slate-800"}>
                ${todo.taskName}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button
                class="rounded-lg py-2 px-4 text-white bg-blue-500 transition hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                Edit
              </button>

              <button
                id="delete-btn"
                class="rounded-lg py-2 px-2 text-white bg-red-500 transition hover:bg-red-600 hover:text-white cursor-pointer"
              >
                Delete
              </button>
        </div>`;
          const deleteBtn =li.querySelector<HTMLButtonElement>("#delete-btn");
          const checkBox=li.querySelector<HTMLInputElement>("#todo-checkbox");

          deleteBtn?.addEventListener("click", () => {
            deleteTodo(todo.id);
          });
          checkBox?.addEventListener("change", () => {
            toggleTodo(todo.id);
          });
  return li;
}

//empty state handle
function toggleEmptyState(): void {
  if (!emptyState || !todoList) return;

  if (todos.length === 0) {
    emptyState.classList.remove("hidden");
    todoList.classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    todoList.classList.remove("hidden");
  }
}

//delete functionality
function deleteTodo(id: number): void {
  todos = todos.filter(
    (todo) => todo.id !== id
  );
  renderTodos();
  toggleEmptyState();
}
//toggle to do functionality
function toggleTodo(id: number): void {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }

    return todo;
  });
  renderTodos();
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = input?.value.trim();
  //if empty text
  if (!taskName) return;
 //create a todo
  const todo: Todo = {
    id: todos.length+1,
    taskName,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  renderTodos();
  toggleEmptyState();
});