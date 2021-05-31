// Todo task objects, to be held in an array

export default class Todo {
  constructor(task) {
    this.id = Date.now();
    this.task = task;
    this.done = false;
  }

  static addTodo(task) {
    let newTodo = new Todo(task);
    return newTodo;
  }

  listTodos() {
    return JSON.stringify(this);
  }

  completeTask() {
    this.done = true;
  }
}
