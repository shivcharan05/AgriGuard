card.className="animal-card";

card.innerHTML = `
<img src="${animal.image}">
<h3>${animal.name}</h3>
<p>Breed: ${animal.breed}</p>
<p>Age: ${animal.age}</p>

<button onclick="viewAnimal(${animal.id})">View</button>
<button onclick="deleteAnimal(${animal.id})">Delete</button>
`;