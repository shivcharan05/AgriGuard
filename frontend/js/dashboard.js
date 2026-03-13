async function loadDashboard(){

const animals = await apiRequest("/animals");

document.getElementById("animalCount").innerText = animals.length;

}

function goToAnimals(){
window.location.href="pages/animals.html";
}

function goToDisease(){
window.location.href="pages/disease-detection.html";
}

function goToVaccination(){
window.location.href="pages/vaccination.html";
}

function goToMap(){
window.location.href="pages/outbreak-map.html";
}

loadDashboard();