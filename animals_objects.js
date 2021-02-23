"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

// Initialize program
function start() {
  console.log("ready");

  // TODO: Add event-listeners to filter and sort buttons

  addEventListenersToButtons();
  loadJSON();
}

// Adding eventlisteners to both my filter and sort buttons
function addEventListenersToButtons() {
  // Filter knapper
  document
    .querySelector("[data-filter=cat]")
    .addEventListener("click", filterByCats);
  document
    .querySelector("[data-filter=dog]")
    .addEventListener("click", filterByDogs);
  document
    .querySelector("[data-filter=all]")
    .addEventListener("click", filterByAll);

  // Sortering knapper
  document
    .querySelector("[data-sort=name]")
    .addEventListener("click", sortByName);

  document
    .querySelector("[data-sort=desc]")
    .addEventListener("click", sortByDesc);

  document
    .querySelector("[data-sort=type]")
    .addEventListener("click", sortByType);

  document
    .querySelector("[data-sort=age]")
    .addEventListener("click", sortByAge);
}

// Filtering functions
function filterByCats() {
  const filterCats = allAnimals.filter(isCats);
  displayList(filterCats);
}

function filterByDogs() {
  const filterDogs = allAnimals.filter(isDogs);
  displayList(filterDogs);
}

function filterByAll() {
  const filterAll = allAnimals.filter(isAll);
  displayList(filterAll);
}

function isCats(animal) {
  console.log("Filter cats");
  if (animal.type === "cat") {
    return true;
  } else {
    return false;
  }
}

function isDogs(animal) {
  console.log("Filter dogs");
  if (animal.type === "dog") {
    return true;
  } else {
    return false;
  }
}

function isAll(animal) {
  console.log("Filter all");
  return true;
}

// Compare functions
function comparesName(a, b) {
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
}

function comparesDesc(a, b) {
  if (a.desc < b.desc) {
    return -1;
  } else {
    return 1;
  }
}

function comparesType(a, b) {
  if (a.type < b.type) {
    return -1;
  } else {
    return 1;
  }
}

function comparesAge(a, b) {
  if (a.age < b.age) {
    return -1;
  } else {
    return 1;
  }
}

// Sorting functions
function sortByName() {
  const sortName = allAnimals.sort(comparesName);
  displayList(sortName);
}

function sortByDesc() {
  const sortDesc = allAnimals.sort(comparesDesc);
  displayList(sortDesc);
}

function sortByType() {
  const sortType = allAnimals.sort(comparesType);
  displayList(sortType);
}

function sortByAge() {
  const sortAge = allAnimals.sort(comparesAge);
  displayList(sortAge);
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
