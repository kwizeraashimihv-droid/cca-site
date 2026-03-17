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

