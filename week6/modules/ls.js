// Local storage functions

export function getList() {
  return JSON.parse(localStorage.getItem('todoList'));
}

export function setList(array) {
  localStorage.setItem('todoList', JSON.stringify(array));
}
