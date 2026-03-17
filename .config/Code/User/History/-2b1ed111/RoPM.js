// load header
fetch("header.html")
.then(function(response){
return response.text()
})
.then(function(data){
var header = document.getElementById("header")
if(header){
header.innerHTML = data
setActiveTab()
}
})

// load footer
fetch("footer.html")
.then(function(response){
return response.text()
})
.then(function(data){
var footer = document.getElementById("footer")
if(footer){
footer.innerHTML = data
}
})

function setActiveTab(){
var links = document.querySelectorAll("nav a")
var current = window.location.pathname.split("/").pop()

links.forEach(function(link){
var href = link.getAttribute("href")
if(href === current){
link.classList.add("active")
}
})
}
/* member cards */

.members{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
padding:40px;
}

.member-card{
background:#161626;
padding:20px;
border-radius:10px;
text-align:center;
}

.member-card img{
width:80px;
height:80px;
border-radius:50%;
margin-bottom:10px;
}

.member-card h3{
margin:10px 0 5px 0;
}

.member-card p{
font-size:14px;
opacity:0.8;
}
import { getAuth, GoogleAuthProvider, signInWithPopup } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

const auth = getAuth()
const provider = new GoogleAuthProvider()

const googleBtn = document.getElementById("googleLogin")

if (googleBtn) {
googleBtn.addEventListener("click", function () {

signInWithPopup(auth, provider)
.then((result) => {

const user = result.user

alert("Welcome to CCA " + user.displayName)

console.log(user)

})
.catch((error) => {

console.error(error)

})

})
}

