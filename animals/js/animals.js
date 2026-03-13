let animals = JSON.parse(localStorage.getItem("animals")) || [];

let list = document.getElementById("animalList");

animals.forEach(animal => {

let card = document.createElement("div");

card.innerHTML = `
<img src="${animal.image}" width="120">
<h3>${animal.name}</h3>
<p>Breed: ${animal.breed}</p>
<p>Age: ${animal.age}</p>

<button onclick="viewAnimal(${animal.id})">View</button>
<button onclick="deleteAnimal(${animal.id})">Delete</button>
`;

list.appendChild(card);

});

function viewAnimal(id){

localStorage.setItem("selectedAnimal", id);

window.location.href = "animal-details.html";

}

function deleteAnimal(id){

let animals = JSON.parse(localStorage.getItem("animals"));

animals = animals.filter(a => a.id !== id);

localStorage.setItem("animals", JSON.stringify(animals));

location.reload();

}