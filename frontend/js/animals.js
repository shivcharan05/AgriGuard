<<<<<<< HEAD
async function loadAnimals(){

const animals = await apiRequest("/animals");

const table = document.getElementById("animalsTable");

table.innerHTML="";
=======
let animals = []


// SHOW FORM

function showAddAnimal(){

document.getElementById("animalForm").style.display = "block"

}



// LOAD ANIMALS

async function loadAnimals(){

try{

const res = await fetch("http://localhost:5000/api/animals")

animals = await res.json()

displayAnimals()

}catch(error){

console.log("Error loading animals:",error)

}

}



// DISPLAY TABLE

function displayAnimals(){

const table = document.getElementById("animalsTable")

table.innerHTML = ""
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c

animals.forEach(animal => {

table.innerHTML += `
<<<<<<< HEAD
=======

>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
<tr>
<td>${animal.name}</td>
<td>${animal.type}</td>
<td>${animal.breed}</td>
<<<<<<< HEAD
</tr>
`;

});

}

loadAnimals();
=======
<td>
<button class="delete-btn" onclick="deleteAnimal('${animal._id}')">Delete</button>
</td>
</tr>

`

})

}



// ADD ANIMAL

async function addAnimal(){

const name = document.getElementById("name").value
const type = document.getElementById("type").value
const breed = document.getElementById("breed").value

try{

await fetch("http://localhost:5000/api/animals",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
type,
breed
})

})

loadAnimals()

document.getElementById("name").value=""
document.getElementById("type").value=""
document.getElementById("breed").value=""

}catch(error){

console.log("Error adding animal:",error)

}

}



// DELETE ANIMAL

async function deleteAnimal(id){

try{

await fetch(`http://localhost:5000/api/animals/${id}`,{
method:"DELETE"
})

loadAnimals()

}catch(error){

console.log("Error deleting animal:",error)

}

}



// INITIAL LOAD

loadAnimals()
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
