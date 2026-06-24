import { Todo } from "./types.js";
//array to store todos
let todos: Todo[] = [];

//select elements
const form=document.querySelector<HTMLFormElement>('#todo-form');
const input=document.querySelector<HTMLInputElement>('#todo-input');
const todoList=document.querySelector<HTMLUListElement>('#todo-list');