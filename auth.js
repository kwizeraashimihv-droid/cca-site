import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js"

const firebaseConfig = {
apiKey: "AIzaSyCtCoAJv3M4-nNDxa8Hy5YSjhiRTGqFvvU",
authDomain: "cca-network.firebaseapp.com",
projectId: "cca-network",
storageBucket: "cca-network.firebasestorage.app",
messagingSenderId: "617798158661",
appId: "1:617798158661:web:da6a33b127f9c2ab81962c"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

const googleBtn = document.getElementById("googleLogin")

if(googleBtn){

googleBtn.addEventListener("click", function(){

signInWithPopup(auth, provider)
.then((result)=>{

const user = result.user

alert("Welcome to CCA " + user.displayName)

})
.catch((error)=>{

console.error(error)

})

})

}
