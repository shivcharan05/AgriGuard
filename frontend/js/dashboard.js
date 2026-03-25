async function loadDashboard() {
  try {
    const dashRes = await fetch("http://localhost:5000/api/dashboard");
    const dashData = await dashRes.json();

    // Total animals
    document.getElementById("animalCount").innerText = dashData.animals.length;

    // Animal distribution chart
    const typeCount = {};
    dashData.animals.forEach(a => typeCount[a.type] = (typeCount[a.type] || 0) + 1);
    const labels = Object.keys(typeCount);
    const values = Object.values(typeCount);
    const colors = labels.map((_, i) => `hsl(${(360 / labels.length) * i},70%,55%)`);
    new Chart(document.getElementById("animalChart"), {
      type: "bar",
      data: { labels, datasets: [{ label: "Animals", data: values, backgroundColor: colors }] }
    });

    // Disease chart
    new Chart(document.getElementById("diseaseChart"), {
      type: "pie",
      data: { labels: ["Disease Cases"], datasets: [{ data: [dashData.diseaseCases], backgroundColor: ["#E53935"] }] }
    });

    // Vaccination chart
    new Chart(document.getElementById("vaccineChart"), {
      type: "doughnut",
      data: { labels: ["Vaccinated", "Not Vaccinated"], datasets: [{ data: [dashData.vaccination.vaccinated, dashData.vaccination.notVaccinated], backgroundColor: ["#43A047", "#BDBDBD"] }] }
    });

    // Alert
    if (dashData.alert) document.getElementById("alertBox").innerHTML = "⚠ Disease outbreak detected!";

  } catch (err) { console.log("Dashboard Error:", err); }
}

// Navigation
function goToAnimals() { window.location.href = "pages/animals.html"; }
function goToDisease() { window.location.href = "pages/disease-detection.html"; }
function goToVaccination() { window.location.href = "pages/vaccination.html"; }
function goToMap() { window.location.href = "pages/outbreak-map.html"; }

loadDashboard();