// Local storage functions

export function getList() {
  return localStorage.getItem('todoList');
}

export function setList(array) {
  localStorage.setItem('todoList', array);
}
