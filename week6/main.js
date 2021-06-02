import Todo from './modules/Todos.js';
import { renderTodo, addTodo, checkTask, startList } from './modules/utilities.js';
import { getList, setList } from './modules/ls.js';

document.getElementById('btnsave').addEventListener('click', addTodo, false);
checkTask();

let todoList = [];
try {
  todoList = getList();
} catch (err) {
  startList();
}
/* switch (todoList) {
  case '':
  case null:
    todoList = [];
    break;
  default:
    renderTodo(todoList);
} */

renderTodo(todoList);

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
  renderTodo(todoList);
  setList(todoList);
}

export function removeTodo() {
  console.log('task cannot be removed');
}
