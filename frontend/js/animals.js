let animals = [];

async function loadAnimals() {
  const res = await fetch("http://localhost:5000/api/animals");
  animals = await res.json();
  displayAnimals();
}

function displayAnimals() {
  const table = document.getElementById("animalsTable");
  table.innerHTML = "";
  animals.forEach(a => {
    table.innerHTML += `<tr>
      <td>${a.name}</td>
      <td>${a.type}</td>
      <td>${a.breed}</td>
      <td><button onclick="deleteAnimal('${a._id}')">Delete</button></td>
    </tr>`;
  });
}

async function addAnimal() {
  const name = document.getElementById("name").value;
  const type = document.getElementById("type").value;
  const breed = document.getElementById("breed").value;

  await fetch("http://localhost:5000/api/animals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type, breed })
  });

  document.getElementById("name").value = "";
  document.getElementById("type").value = "";
  document.getElementById("breed").value = "";

  loadAnimals();
  loadDashboard(); // Update dashboard
}

async function deleteAnimal(id) {
  await fetch(`http://localhost:5000/api/animals/${id}`, { method: "DELETE" });
  loadAnimals();
  loadDashboard();
}

function showAddAnimal() { document.getElementById("animalForm").style.display = "block"; }

loadAnimals();