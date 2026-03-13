async function loadDashboard(){

<<<<<<< HEAD
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
=======
try{

// FETCH ANIMAL DATA
const animalRes = await fetch("http://localhost:5000/api/animals")
const animals = await animalRes.json()

// FETCH DASHBOARD DATA
const dashRes = await fetch("http://localhost:5000/api/dashboard")
const dashData = await dashRes.json()


// ==============================
// TOTAL ANIMAL COUNT
// ==============================

document.getElementById("animalCount").innerText = animals.length



// ==============================
// ANIMAL DISTRIBUTION LOGIC
// ==============================

let animalCount = {}

animals.forEach(animal => {

let type = animal.type.trim().toLowerCase()

if(animalCount[type]){
animalCount[type]++
}
else{
animalCount[type] = 1
}

})

const labels = Object.keys(animalCount).map(a => 
a.charAt(0).toUpperCase() + a.slice(1)
)

const values = Object.values(animalCount)


// ==============================
// GENERATE COLORS DYNAMICALLY
// ==============================

function generateColors(n){

let colors = []

for(let i=0;i<n;i++){

let hue = Math.floor((360/n)*i)

colors.push(`hsl(${hue},70%,55%)`)

}

return colors

}

const colors = generateColors(labels.length)



// ==============================
// ANIMAL CHART
// ==============================

const animalCtx = document.getElementById("animalChart")
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c

new Chart(animalCtx,{

type:"bar",

data:{
<<<<<<< HEAD
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
=======

labels:labels,

datasets:[{

label:"Animals",

data:values,

backgroundColor:colors

}]

}

})



// ==============================
// DISEASE CHART
// ==============================

const diseaseCtx = document.getElementById("diseaseChart")
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c

new Chart(diseaseCtx,{

type:"pie",

data:{
<<<<<<< HEAD
labels:["Disease Cases"],
datasets:[{
data:[data.diseaseCases]
}]
}

});

// Vaccination Chart

const vaccineCtx=document.getElementById("vaccineChart");
=======

labels:["Disease Cases"],

datasets:[{

data:[dashData.diseaseCases],

backgroundColor:["#E53935"]

}]

}

})



// ==============================
// VACCINATION CHART
// ==============================

const vaccineCtx = document.getElementById("vaccineChart")
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c

new Chart(vaccineCtx,{

type:"doughnut",

data:{
<<<<<<< HEAD
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
=======

labels:["Vaccinated","Not Vaccinated"],

datasets:[{

data:[
dashData.vaccination.vaccinated,
dashData.vaccination.notVaccinated
],

backgroundColor:[
"#43A047",
"#BDBDBD"
]

}]

}

})



// ==============================
// ALERT BOX
// ==============================

if(dashData.alert){

document.getElementById("alertBox").innerHTML =
"⚠ Disease outbreak detected!"

}

}
catch(error){

console.log("Dashboard Error:",error)

}

}



// ==============================
// NAVIGATION
// ==============================

function goToAnimals(){
window.location.href="pages/animals.html"
}

function goToDisease(){
window.location.href="pages/disease-detection.html"
}

function goToVaccination(){
window.location.href="pages/vaccination.html"
}

function goToMap(){
window.location.href="pages/outbreak-map.html"
}


// LOAD DASHBOARD

loadDashboard()
>>>>>>> bda5eaf0146a2d6109669ff51219ae0bd3afe04c
