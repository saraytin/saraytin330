// Document manipulation
const removeUrl = '../images/remove.png';
const removeAlt = 'picture of a red x';

export function renderTodo(todoList) {
  /*  let todoJson = JSON.parse(todoList); */
  for (i = 0; i < todoList.length; i++) {
    let card = document.createElement('section');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let remove = document.createElement('img');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'item' + i);
    checkbox.setAttribute('name', 'item' + i);
    label.setAttribute('for', 'item' + i);
    label.textContent(todoJson[i].task);
    if (todoJson[i].done) {
      checkbox.checked = true;
      label.setAttribute('style', 'text-decoration:strikethrough;');
    }
    remove.setAttribute('src', removeUrl);
    remove.setAttribute('alt', removeAlt);
    card.appendChild(checkbox);
    card.appendChild(label);
    card.appendChild(remove);
    document.querySelector('div.list').appendChild(card);
  }
}

export function addTodo() {
  let task = document.querySelector('textarea#newTodo').value;
  saveTodo(task);
  document.querySelector('textarea#newTodo').value = '';
  renderTodo();
}

export function checkTask() {}
