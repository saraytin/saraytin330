import Todo from './modules/Todos.js';
import { renderTodo, addTodo, checkTask, startList } from './modules/utilities.js';
import { getList, setList } from './modules/ls.js';

document.getElementById('btnsave').addEventListener('click', addTodo, false);

export let todoList = [];

loadPage();

function loadPage() {
  switch (getList()) {
    case null:
      startList();
      break;
    default:
      todoList = getList();
      renderTodo();
  }
}

/* try {
  console.log(getList());
} catch (err) {
  startList();
} */

checkTask();

/* switch (todoList) {
  case '':
  case null:
    todoList = [];
    break;
  default:
    renderTodo(todoList);
} */

/* function addTodo() {
  let task = document.querySelector('textarea#newTodo').value;
  todoList.push(task);
  document.querySelector('textarea#newTodo').value = '';
  renderTodo();
  setList(todoList);
} */

export function saveTodo(text) {
  let task = new Todo(text);
  todoList.push(task);
  renderTodo();
  setList(todoList);
}

export function removeTodo() {
  localStorage.clear();
  loadPage();
  console.log('task cannot be removed individually yet');
}
