document.getElementById("animalForm").addEventListener("submit", function(e){

e.preventDefault();

let animals = JSON.parse(localStorage.getItem("animals")) || [];

let imageFile = document.getElementById("image").files[0];
let reader = new FileReader();

reader.onload = function(){

let animal = {

id: Date.now(),

name: document.getElementById("name").value,

species: document.getElementById("species").value,

breed: document.getElementById("breed").value,

age: document.getElementById("age").value,

vaccinations: document.getElementById("vaccinations").value,

diseases: document.getElementById("diseases").value,

treatment: document.getElementById("treatment").value,

image: reader.result

};

animals.push(animal);

localStorage.setItem("animals", JSON.stringify(animals));

alert("Animal Added Successfully");

window.location.href = "animals.html";

};

reader.readAsDataURL(imageFile);

});