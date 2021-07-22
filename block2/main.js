const apiId = "app_id=f347c83e";
const apiKey = "&app_key=274a7db9ef4c3398e138e7e751a17da2";
const searchURLpart1 = "https://api.edamam.com/api/food-database/v2/parser?";
const searchURLpart2 = "&ingr=";
const searchURLpart3 = "&nutrition-type=logging";
const autoCompleteURLpart1 = "https://api.edamam.com/auto-complete?";
const autoCompleteURLpart2 = "&q=";
const autoCompleteURLpart3 = "&limit=10";

const searchInput = document.getElementById("foodSearch");
searchInput.addEventListener("input", searchFood, false);
/* const searchSubmit = document.getElementById("submitSearch");
searchSubmit.addEventListener("click", searchFood, false); */

import foodController from "./modules/Foods.js";
import goalController from "./modules/Goals.js";

const foodList = document.getElementById("foodList");
const myFoods = new foodController(foodList);
const goalList = document.getElementById("goalList");
const myGoals = new goalController(goalList);

/* let autoCompleteArray = []; */
/* autocomplete(document.getElementById("foodSearch"), autoCompleteArray); */
removeButtons();

function removeButtons() {
  let elements = document.getElementsByClassName("remove");

  let myFunction = function () {
    let id = this.getAttribute("id");
    myFoods.deleteFood(id);
    myGoals.deleteGoal(id);
    removeButtons();
  };

  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", myFunction, false);
  }
}

document.getElementById("addGoal").addEventListener("click", () => {
  const goal = document.getElementById("goalInput").value;
  myGoals.newGoal(goal);
  removeButtons();
});

document.getElementById("clearFoods").addEventListener("click", () => {
  myFoods.clearFoods();
});

document.getElementById("clearGoals").addEventListener("click", () => {
  myGoals.clearGoals();
});

document.getElementById("fullFoods").addEventListener("click", () => {
  myFoods.listFullFoods();
  removeButtons();
});

document.getElementById("fullGoals").addEventListener("click", () => {
  myGoals.listFullGoals();
  removeButtons();
});

function saveSearch() {
  const foodName = document.getElementById("foodName").innerHTML;
  const foodCal = document.getElementById("foodCal").innerHTML;
  const foodPro = document.getElementById("foodPro").innerHTML;
  const foodFat = document.getElementById("foodFat").innerHTML;
  const foodCarb = document.getElementById("foodCarb").innerHTML;
  const foodFib = document.getElementById("foodFib").innerHTML;
  myFoods.newFood(foodName, foodCal, foodPro, foodFat, foodCarb, foodFib);
  removeButtons();
}

function searchFood() {
  let foodName = searchInput.value;
  foodName.replace(" ", "%20");
  let requestURL = searchURLpart1 + apiId + apiKey + searchURLpart2 + foodName + searchURLpart3;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      if (!jsonObject.parsed[0]) {
      } else {
        let food = jsonObject.parsed[0].food;
        let card = document.createElement("section");
        let label = document.createElement("h3");
        let nutrients = document.createElement("ul");
        let kcalOuter = document.createElement("li");
        let kcal = document.createElement("span");
        let proteinOuter = document.createElement("li");
        let protein = document.createElement("span");
        let fatOuter = document.createElement("li");
        let fat = document.createElement("span");
        let carbsOuter = document.createElement("li");
        let carbs = document.createElement("span");
        let fiberOuter = document.createElement("li");
        let fiber = document.createElement("span");
        let addBtn = document.createElement("button");
        label.textContent = food.label;
        kcalOuter.textContent = "Calories (kcal): ";
        proteinOuter.textContent = "Protein (g): ";
        fatOuter.textContent = "Fat (g): ";
        carbsOuter.textContent = "Carbs (g): ";
        fiberOuter.textContent = "Fiber (g): ";
        kcal.textContent = Math.round(food.nutrients.ENERC_KCAL);
        protein.textContent = food.nutrients.PROCNT.toFixed(2);
        fat.textContent = food.nutrients.FAT.toFixed(2);
        carbs.textContent = food.nutrients.CHOCDF.toFixed(2);
        fiber.textContent = food.nutrients.FIBTG.toFixed(2);
        addBtn.setAttribute("id", "addFood");
        label.setAttribute("id", "foodName");
        kcal.setAttribute("id", "foodCal");
        protein.setAttribute("id", "foodPro");
        fat.setAttribute("id", "foodFat");
        carbs.setAttribute("id", "foodCarb");
        fiber.setAttribute("id", "foodFib");
        addBtn.textContent = "Add Food";
        card.appendChild(label);
        if (food.image) {
          let img = document.createElement("img");
          let imgsrc = food.image;
          let imgalt = food.label;
          img.setAttribute("src", imgsrc);
          img.setAttribute("alt", imgalt);
          card.appendChild(img);
        } else {
          let img = document.createElement("p");
          img.textContent = "No image on file.";
          card.appendChild(img);
        }
        kcalOuter.appendChild(kcal);
        proteinOuter.appendChild(protein);
        fatOuter.appendChild(fat);
        carbsOuter.appendChild(carbs);
        fiberOuter.appendChild(fiber);
        nutrients.appendChild(kcalOuter);
        nutrients.appendChild(proteinOuter);
        nutrients.appendChild(fatOuter);
        nutrients.appendChild(carbsOuter);
        nutrients.appendChild(fiberOuter);
        card.appendChild(nutrients);
        card.appendChild(addBtn);
        document.querySelector("div#searchResult").innerHTML = "";
        document.querySelector("div#searchResult").appendChild(card);
        document.getElementById("addFood").addEventListener("click", saveSearch);
      }
    });
}

function buildAutoComplete() {
  let foodName = searchInput.value;
  let requestURL = autoCompleteURLpart1 + apiId + apiKey + autoCompleteURLpart2 + foodName + autoCompleteURLpart3;
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {
      autoCompleteArray = jsonObject;
      console.log(autoCompleteArray);
    });
}

/* grabbed from w3schools for testing purposes
function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
} */
