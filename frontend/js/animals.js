async function loadAnimals(){

const animals = await apiRequest("/animals");

const table = document.getElementById("animalsTable");

table.innerHTML="";

animals.forEach(animal => {

table.innerHTML += `
<tr>
<td>${animal.name}</td>
<td>${animal.type}</td>
<td>${animal.breed}</td>
</tr>
`;

});

}

loadAnimals();