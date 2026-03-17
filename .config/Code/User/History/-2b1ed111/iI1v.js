import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"


// FIREBASE CONFIG
const firebaseConfig = {
apiKey:"AIzaSyCtCoAJv3M4-nNDxa8Hy5YSjhiRTGqFvvU",
authDomain: "cca-network.firebaseapp.com",
projectId: "cca-network",
storageBucket: "cca-network.firebasestorage.app",
messagingSenderId: "617798158661",
appId: "1:617798158661:web:da6a33b127f9c2ab81962c"
}

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


// LOAD HEADER
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


// LOAD FOOTER
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


// ACTIVE TAB
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


// GOOGLE LOGIN
const googleBtn = document.getElementById("googleLogin")

if (googleBtn){

googleBtn.addEventListener("click", function(){

signInWithPopup(auth, provider)
.then((result)=>{

const user = result.user

alert("Welcome to CCA " + user.displayName)

console.log(user)

})
.catch((error)=>{

console.error(error)

})

})

}

