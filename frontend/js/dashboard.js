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
fetch("http://localhost:5000/api/dashboard")

.then(res=>res.json())

.then(data=>{

// Animal Chart
const animalCtx = document.getElementById("animalChart");

new Chart(animalCtx,{

type:"bar",

data:{
labels:["Cow","Buffalo","Goat"],
datasets:[{
label:"Animals",
data:[
data.animals.cow,
data.animals.buffalo,
data.animals.goat
]
}]
}

});

// Disease Chart

const diseaseCtx=document.getElementById("diseaseChart");

new Chart(diseaseCtx,{

type:"pie",

data:{
labels:["Disease Cases"],
datasets:[{
data:[data.diseaseCases]
}]
}

});

// Vaccination Chart

const vaccineCtx=document.getElementById("vaccineChart");

new Chart(vaccineCtx,{

type:"doughnut",

data:{
labels:["Vaccinated","Not Vaccinated"],
datasets:[{
data:[
data.vaccination.vaccinated,
data.vaccination.notVaccinated
]
}]
}

});

// Alert

if(data.alert){

document.getElementById("alertBox").innerHTML=
"⚠ Disease outbreak detected!";

}

});

loadDashboard();