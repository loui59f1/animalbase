"use strict";

window.addEventListener("DOMContentLoaded", start);

const allAnimals = [];
const Animal = {
  name: "",
  desc: "",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");
  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((jsonObject) => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array

    //Splitting the string
    const animal = Object.create(Animal);
    let animalData = jsonObject.fullname.split(" ");
    console.log(animalData);

    //Name
    let animalName = animalData[0];
    console.log(animalName);
    animal.name = animalName;

    //Description
    let animalDesc = animalData[2];
    console.log(animalDesc);
    animal.desc = animalDesc;

    //Type
    let animalType = animalData[3];
    console.log(animalType);
    animal.type = animalType;

    //Age
    let animalAge = jsonObject.age;
    console.log(animalAge);
    animal.age = animalAge;

    // TODO: MISSING CODE HERE !!
    //Adding all the objects into the array
    allAnimals.push(animal);
  });

  displayList();
}

function displayList() {
  document.querySelector("#list tbody").innerHTML = "";

  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document
    .querySelector("template#animal")
    .content.cloneNode(true);

  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  document.querySelector("#list tbody").appendChild(clone);
}
