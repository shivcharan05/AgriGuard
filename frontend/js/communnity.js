async function createPost(){

const text = document.getElementById("postText").value;

await apiRequest("/posts","POST",{text});

loadPosts();

}

async function loadPosts(){

const posts = await apiRequest("/posts");

const container = document.getElementById("posts");

container.innerHTML="";

posts.forEach(p => {

container.innerHTML += `<p>${p.text}</p>`;

});

}

loadPosts();