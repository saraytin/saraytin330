export function qs(selectorName) {
  return document.querySelector(selectorName);
}

export function readFromLS(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function writeToLS(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// uses a touchend for mobile devices and falls back to a click for desktop
export function bindTouch(selector, callback) {
  const element = qs(selector);
  element.addEventListener("touchend", (e) => {
    e.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

export function removeButtons() {
  let elements = document.getElementsByClassName("remove");

  let myFunction = function () {
    let id = this.getAttribute("id");
    myFoods.deleteFood(id);
    myGoals.deleteGoal(id);
    removeButtons();
  };

  for (let i = 0; i < elements.length; i++) {
    console.log("here");
    elements[i].addEventListener("click", myFunction, false);
  }
}
