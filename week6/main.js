import Todo from './modules/Todos.js';
import { renderTodo, addTodo, checkTask } from './modules/utilities.js';
import { getList, setList } from './modules/ls.js';

let todoList = getList();
switch (todoList) {
  case '':
  case null:
    todoList = [];
    break;
  default:
    renderTodo();
}

function saveTodo(task) {
  todoList.append(task);
}

setList();
