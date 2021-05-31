import Todo from './modules/Todos.js';
import { renderTodo, addTodo } from './modules/utilities.js';
import { getList, setList } from './modules/ls.js';

let todoList = getList();
if (todoList !== null && todoList !== '') {
  renderTodo();
}
