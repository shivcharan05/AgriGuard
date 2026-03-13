let animals = JSON.parse(localStorage.getItem("animals")) || [];

let id = localStorage.getItem("selectedAnimal");

let animal = animals.find(a => a.id == id);

let div = document.getElementById("details");

div.innerHTML = `

<img src="${animal.image}" width="200">

<h2>${animal.name}</h2>

<p>Species: ${animal.species}</p>

<p>Breed: ${animal.breed}</p>

<p>Age: ${animal.age}</p>

<h3>Vaccinations</h3>
<p>${animal.vaccinations}</p>

<h3>Diseases</h3>
<p>${animal.diseases}</p>

<h3>Treatment History</h3>
<p>${animal.treatment}</p>

`;