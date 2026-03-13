async function uploadImage(){

const file = document.getElementById("image").files[0];

const formData = new FormData();

formData.append("image",file);

const response = await fetch("http://localhost:5000/api/disease/upload",{

method:"POST",
body:formData

});

const data = await response.json();

document.getElementById("result").innerText = data.result;

}