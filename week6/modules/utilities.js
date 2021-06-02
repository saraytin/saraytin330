// Document manipulation
import { saveTodo, removeTodo } from '../main.js';

const removeUrl = './images/remove.png';
const removeAlt = 'picture of a red x';

export function renderTodo(todoList) {
  /*  let todoJson = JSON.parse(todoList); */
  let i = 0;
  console.log(todoList);
  document.getElementById('list').innerHTML = '';
  for (i = 0; i < todoList.length; i++) {
    let card = document.createElement('section');
    let checkbox = document.createElement('input');
    let label = document.createElement('label');
    let remove = document.createElement('img');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'item' + i);
    checkbox.setAttribute('name', 'item' + i);
    label.setAttribute('for', 'item' + i);
    label.setAttribute('id', 'item' + i + '-label');
    label.textContent = todoList[i].task;
    if (todoList[i].done) {
      checkbox.checked = true;
    }
    remove.setAttribute('src', removeUrl);
    remove.setAttribute('alt', removeAlt);
    remove.setAttribute('class', 'remove');
    card.appendChild(checkbox);
    card.appendChild(label);
    card.appendChild(remove);
    document.querySelector('div#list').appendChild(card);
  }

  let divs1 = document.querySelectorAll('.remove');
  divs1.forEach((el) => el.addEventListener('click', removeTodo, false));
  let divs2 = document.querySelectorAll('input');
  divs2.forEach((el) => el.addEventListener('click', checkTask, false));
}

export function addTodo() {
  let task = document.querySelector('textarea#newTodo').value;
  saveTodo(task);
  document.querySelector('textarea#newTodo').value = '';
}

export function checkTask() {
  let inputs = document.querySelectorAll('input');
  let labels = document.querySelectorAll('label');
  let i = 0;
  for (i = 0; i < inputs.length; i++) {
    switch (inputs[i].checked) {
      case true:
        labels[i].setAttribute('style', 'text-decoration:line-through;');
        break;
      default:
        labels[i].setAttribute('style', 'text-decoration:none;');
    }
  }
}

export function startList() {
  let p = document.createElement('p');
  p.textContent = 'Please add a task to start a to-do list.';
  document.querySelector('div#list').appendChild(p);
}
