import { Todo } from "./types.js";

//constraints
const STORAGE_KEY:string = "todos";
//array to store todos
let todos: Todo[] = [];

//select elements
const form=document.querySelector<HTMLFormElement>('#todo-form');
const input=document.querySelector<HTMLInputElement>('#todo-input');
const todoList=document.querySelector<HTMLUListElement>('#todo-list');
const emptyState= document.querySelector<HTMLDivElement>('#empty-state');
const submitBtn = document.querySelector<HTMLButtonElement>('#submit-btn')
let editingTodoId: number | null = null;
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
  li.className=`flex gap-4 items-center justify-between rounded-2xl border border-slate-200 px-5 py-4 shadow-sm transition hover:border-slate-300 hover:shadow-md${todo.completed?"bg-slate-50 opacity-70":"bg-white"}`
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
                id="edit-btn"
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
          const editBtn=li.querySelector<HTMLButtonElement>('#edit-btn')
          deleteBtn?.addEventListener("click", () => {
            deleteTodo(todo.id);
          });
          checkBox?.addEventListener("change", () => {
            toggleTodo(todo.id);
          });
          editBtn?.addEventListener("click",() => {
            startEditing(todo);
          }
);
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
  saveTodos();
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
  saveTodos();
  renderTodos();
}

//create edit functionality
function startEditing(todo: Todo): void {
  editingTodoId = todo.id;

  if (!input || !submitBtn) return;

  input.value = todo.taskName;

  submitBtn.textContent = "Update";

  input.focus();
}

//update functionality
function updateTodo(id: number,newTaskName: string): void {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        taskName: newTaskName,
      };
    }

    return todo;
  });
  saveTodos();
  renderTodos();
}

//save to local storage
function saveTodos(): void {
  localStorage.setItem(STORAGE_KEY,JSON.stringify(todos));
}

//load todos
function loadTodos(): void {
  const storedTodos =localStorage.getItem(STORAGE_KEY);
  if (!storedTodos) return;
  todos = JSON.parse(storedTodos);
}
//submit handler
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskName = input?.value.trim();

  if (!taskName) return;

  // UPDATE todo
  if (editingTodoId !== null) {
    updateTodo(editingTodoId, taskName);

    editingTodoId = null;

    if (submitBtn) {
      submitBtn.textContent = "Add";
    }
  }

  // ADD todo
  else {
    const todo: Todo = {
      id: todos.length+1,
      taskName,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(todo);
    saveTodos();
    renderTodos();
    toggleEmptyState();
  }

  if (input) {
    input.value = "";
    input.focus();
  }
});

loadTodos();
renderTodos();
toggleEmptyState();