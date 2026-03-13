async function registerUser(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch(`${API_BASE_URL}/auth/register`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

});

const data = await response.json();

if(response.ok){

document.getElementById("message").innerText="Registration successful";

setTimeout(()=>{
window.location.href="dashboard.html";
},1000);

}
else{

document.getElementById("message").innerText=data.message;

}

}
catch(error){

document.getElementById("message").innerText="Server error";

}

}
async function loginUser(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const data = await apiRequest("/auth/login","POST",{
email,
password
});

if(data.token){

localStorage.setItem("token",data.token);

window.location.href="dashboard.html";

}else{

alert("Invalid login credentials");

}

}
function checkAuth(){

const token = localStorage.getItem("token");

if(!token){

window.location.href="login.html";

}

}
function logout(){

localStorage.removeItem("token");

window.location.href="index.html";

}
function checkAuth(){

const token = localStorage.getItem("token");

if(!token){

window.location.href="login.html";

}

}

function logout(){

localStorage.removeItem("token");

window.location.href="login.html";

}