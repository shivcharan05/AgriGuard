var map = L.map('map').setView([20.5937,78.9629],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
}).addTo(map);

var redIcon = new L.Icon({
iconUrl:"https://maps.google.com/mapfiles/ms/icons/red-dot.png"
});

fetch("http://localhost:5000/api/outbreaks")

.then(res=>res.json())

.then(data=>{

data.forEach(d=>{

L.marker([d.latitude,d.longitude],{icon:redIcon})

.addTo(map)

.bindPopup("Disease: "+d.diseaseName);

});

});