import { qs, writeToLS, readFromLS, bindTouch } from "./utilities.js";

//  Model
class foodModel {
  constructor(key) {
    // key for localStorage saving and lookup
    this.key = key;
    // check for existing foods
    this.foods = readFromLS(this.key) || [];
  }
  getFoods() {
    this.foods = readFromLS(this.key);
    if (!this.foods) {
      this.foods = [];
    }
    return this.foods;
  }

  addFood(name, kcal, pro, fat, carb, fib) {
    const newfood = {
      id: new Date(),
      name: name,
      kcal: kcal,
      protein: pro,
      fat: fat,
      carbs: carb,
      fiber: fib,
    };
    this.foods.push(newfood);
    writeToLS(this.key, this.foods);
  }

  removeFood(id) {
    this.foods = this.foods.filter(function (e) {
      return e.id !== id;
    });
    writeToLS(this.key, this.foods);
  }

  clearFoodModel() {
    this.foods = [];
    writeToLS(this.key, this.foods);
  }
}

// Controller
export default class foodController {
  constructor(listElement) {
    // store the listElement inside the class
    this.listElement = listElement;
    // create a new instance of our model and add it to the controller.
    this.foodModel = new foodModel("food");
    this.listFoods();
  }

  newFood(name, kcal, pro, fat, carb, fib) {
    this.foodModel.addFood(name, kcal, pro, fat, carb, fib);
    this.listFoods();
  }

  deleteFood(id) {
    this.foodModel.removeFood(id);
    this.listFoods();
  }

  clearFoods() {
    this.foodModel.clearFoodModel();
    this.listFoods();
  }

  listFoods(hidden = true) {
    renderList(this.foodModel.getFoods(), this.listElement, hidden);
  }

  listFullFoods(hidden = true) {
    renderFullList(this.foodModel.getFoods(), this.listElement, hidden);
  }
}

// View
function renderList(list, element, hidden) {
  element.innerHTML = "";
  let totalCal = 0;
  let totalPro = 0;
  let totalFat = 0;
  let totalCarb = 0;
  let totalFib = 0;

  list.forEach((food) => {
    const formattedDate = new Date(food.id).toLocaleDateString("en-US");
    if (formattedDate == new Date().toLocaleDateString("en-us")) {
      const item = document.createElement("li");
      const button = document.createElement("a");

      item.innerHTML = `${food.name}: ${food.kcal} kcal (${formattedDate})`;
      button.setAttribute("id", food.id);
      button.textContent = "Remove";
      button.setAttribute("class", "remove");
      item.appendChild(button);
      element.appendChild(item);
      totalCal += parseFloat(food.kcal);
      totalPro += parseFloat(food.protein);
      totalFat += parseFloat(food.fat);
      totalCarb += parseFloat(food.carbs);
      totalFib += parseFloat(food.fiber);
    }
  });
  document.getElementById("totalCal").innerHTML = Math.round(totalCal);
  document.getElementById("totalPro").innerHTML = totalPro.toFixed(2);
  document.getElementById("totalFat").innerHTML = totalFat.toFixed(2);
  document.getElementById("totalCarb").innerHTML = totalCarb.toFixed(2);
  document.getElementById("totalFib").innerHTML = totalFib.toFixed(2);
  document.getElementById("remCal").innerHTML = 2000 - Math.round(totalCal);
  document.getElementById("remPro").innerHTML = 50 - totalPro.toFixed(2);
  document.getElementById("remFat").innerHTML = 70 - totalFat.toFixed(2);
  document.getElementById("remCarb").innerHTML = 260 - totalCarb.toFixed(2);
  document.getElementById("remFib").innerHTML = 25 - totalFib.toFixed(2);
}

function renderFullList(list, element, hidden) {
  element.innerHTML = "";
  let totalCal = 0;
  let totalPro = 0;
  let totalFat = 0;
  let totalCarb = 0;
  let totalFib = 0;

  list.forEach((food) => {
    const item = document.createElement("li");
    const formattedDate = new Date(food.id).toLocaleDateString("en-US");
    const button = document.createElement("a");

    item.innerHTML = `${food.name}: ${food.kcal} kcal (${formattedDate})`;
    button.setAttribute("id", food.id);
    button.textContent = "Remove";
    button.setAttribute("class", "remove");
    item.appendChild(button);
    element.appendChild(item);
    totalCal += parseFloat(food.kcal);
    totalPro += parseFloat(food.protein);
    totalFat += parseFloat(food.fat);
    totalCarb += parseFloat(food.carbs);
    totalFib += parseFloat(food.fiber);
  });
  document.getElementById("totalCal").innerHTML = Math.round(totalCal);
  document.getElementById("totalPro").innerHTML = totalPro.toFixed(2);
  document.getElementById("totalFat").innerHTML = totalFat.toFixed(2);
  document.getElementById("totalCarb").innerHTML = totalCarb.toFixed(2);
  document.getElementById("totalFib").innerHTML = totalFib.toFixed(2);
  document.getElementById("remCal").innerHTML = 2000 - Math.round(totalCal);
  document.getElementById("remPro").innerHTML = 50 - totalPro.toFixed(2);
  document.getElementById("remFat").innerHTML = 70 - totalFat.toFixed(2);
  document.getElementById("remCarb").innerHTML = 260 - totalCarb.toFixed(2);
  document.getElementById("remFib").innerHTML = 25 - totalFib.toFixed(2);
}
