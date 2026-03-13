const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, method="GET", body=null){

const options = {
method: method,
headers: {
"Content-Type":"application/json"
}
};

const token = localStorage.getItem("token");

if(token){
options.headers["Authorization"] = "Bearer " + token;
}

if(body){
options.body = JSON.stringify(body);
}

const response = await fetch(API_BASE_URL + endpoint, options);

return response.json();

}