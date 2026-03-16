let vaccinations = [];

async function loadVaccinations() {
  const res = await fetch("http://localhost:5000/api/vaccinations");
  vaccinations = await res.json();
  displayVaccinations();
}

function displayVaccinations() {
  const table = document.getElementById("vaccinationTable");
  table.innerHTML = "";
  vaccinations.forEach(v => {
    table.innerHTML += `<tr>
      <td>${v.animalId}</td>
      <td>${v.animalType}</td>
      <td>${v.vaccine}</td>
      <td>${v.date}</td>
      <td><button onclick="deleteVaccination('${v._id}')">Delete</button></td>
    </tr>`;
  });
}

async function addVaccination() {
  const animalId = document.getElementById("animalId").value;
  const animalType = document.getElementById("animalType").value;
  const vaccine = document.getElementById("vaccine").value;
  const date = document.getElementById("date").value;

  if (!animalId || !animalType || !vaccine || !date) return alert("Fill all fields");

  await fetch("http://localhost:5000/api/vaccinations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ animalId, animalType, vaccine, date })
  });

  document.getElementById("animalId").value = "";
  document.getElementById("animalType").value = "";
  document.getElementById("vaccine").value = "";
  document.getElementById("date").value = "";

  loadVaccinations();
  loadDashboard(); // Update dashboard
}

async function deleteVaccination(id) {
  await fetch(`http://localhost:5000/api/vaccinations/${id}`, { method: "DELETE" });
  loadVaccinations();
  loadDashboard(); // Update dashboard
}

loadVaccinations();