async function loadDashboard(){

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

new Chart(animalCtx,{

type:"bar",

data:{

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

new Chart(diseaseCtx,{

type:"pie",

data:{

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

new Chart(vaccineCtx,{

type:"doughnut",

data:{

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