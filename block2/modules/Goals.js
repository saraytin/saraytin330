import { qs, writeToLS, readFromLS, bindTouch } from "./utilities.js";

//  Model
class goalModel {
  constructor(key) {
    // key for localStorage saving and lookup
    this.key = key;
    // check for existing goals
    this.goals = readFromLS(this.key) || [];
  }
  getGoals() {
    this.goals = readFromLS(this.key);
    if (!this.goals) {
      this.goals = [];
    }
    return this.goals;
  }

  filterGoals(completed = true) {
    this.goals = readFromLS(this.key);
    // return a list of either completed or not completed goals based on the parameter.
    return this.goals.filter((item) => item.completed === hidden);
  }
  addGoal(value) {
    // use Date.now() for UTC millisecond string.
    const newgoal = {
      id: new Date(),
      content: value,
    };
    this.goals.push(newgoal);
    writeToLS(this.key, this.goals);
  }

  removeGoal(id) {
    this.goals = this.goals.filter(function (e) {
      return e.id !== id;
    });
    writeToLS(this.key, this.goals);
  }

  clearGoalModel() {
    this.goals = [];
    writeToLS(this.key, this.goals);
  }
}

// Controller
export default class goalController {
  constructor(listElement) {
    this.listElement = listElement;
    this.goalModel = new goalModel("goal");
    this.listGoals();
  }

  newGoal(value) {
    this.goalModel.addGoal(value);
    this.listGoals();
  }

  deleteGoal(id) {
    this.goalModel.removeGoal(id);
    this.listGoals();
  }

  clearGoals() {
    this.goalModel.clearGoalModel();
    this.listGoals();
  }

  listGoals(hidden = true) {
    renderList(this.goalModel.getGoals(), this.listElement, hidden);
  }

  listFullGoals(hidden = true) {
    renderFullList(this.goalModel.getGoals(), this.listElement, hidden);
  }
}

// View
function renderList(list, element, hidden) {
  element.innerHTML = "";

  list.forEach((goal) => {
    const formattedDate = new Date(goal.id).toLocaleDateString("en-US");
    if (formattedDate == new Date().toLocaleDateString("en-us")) {
      const item = document.createElement("li");
      const button = document.createElement("a");
      item.innerHTML = `${formattedDate}: ${goal.content}`;
      button.setAttribute("id", goal.id);
      button.textContent = "Remove";
      button.setAttribute("class", "remove");
      item.appendChild(button);
      element.appendChild(item);
    }
  });
}

function renderFullList(list, element, hidden) {
  element.innerHTML = "";

  list.forEach((goal) => {
    const formattedDate = new Date(goal.id).toLocaleDateString("en-US");
    const item = document.createElement("li");
    const button = document.createElement("a");
    item.innerHTML = `${formattedDate}: ${goal.content}`;
    button.setAttribute("id", goal.id);
    button.textContent = "Remove";
    button.setAttribute("class", "remove");
    item.appendChild(button);
    element.appendChild(item);
  });
}
