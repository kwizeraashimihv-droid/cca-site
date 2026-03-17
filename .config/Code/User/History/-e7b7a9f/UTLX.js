/* AUTO REDIRECT */
const savedUser = localStorage.getItem("ccaUser")

if(savedUser && window.location.pathname.includes("index.html")){
window.location.href = "home.html"
}

/* LOAD HEADER */
fetch("header.html")
.then(res => res.text())
.then(data => {
const header = document.getElementById("header")
if(header){
header.innerHTML = data
setActiveTab()
}
})

/* LOAD FOOTER */
fetch("footer.html")
.then(res => res.text())
.then(data => {
const footer = document.getElementById("footer")
if(footer){
footer.innerHTML = data
}
})

/* ACTIVE TAB */
function setActiveTab(){
const links = document.querySelectorAll("nav a")
const current = window.location.pathname.split("/").pop()

links.forEach(link => {
if(link.getAttribute("href") === current){
link.classList.add("active")
}
})
}

/* TRENDING SCROLL */
function scrollTrending(direction){
const track = document.getElementById("trendingTrack")
if(!track) return

track.scrollBy({
left: direction * 300,
behavior: "smooth"
})
}

/* DOM READY */
document.addEventListener("DOMContentLoaded", function(){

/* ELEMENTS */
const popup = document.getElementById("joinPopup")
const closeJoin = document.getElementById("closeJoin")
const submitJoin = document.getElementById("submitJoin")

const animePopup = document.getElementById("animePopup")
const closePopup = document.getElementById("closePopup")

const popupTitle = document.getElementById("popupTitle")
const popupPoster = document.getElementById("popupPoster")
const popupScore = document.getElementById("popupScore")
const watchLink = document.getElementById("watchLink")

/* CLOSE JOIN POPUP */
if(closeJoin){
closeJoin.onclick = () => popup.style.display = "none"
}

/* CLOSE ANIME POPUP */
if(closePopup){
closePopup.onclick = () => animePopup.style.display = "none"
}

/* CLICK OUTSIDE POPUP */
window.onclick = function(e){
if(e.target === popup){
popup.style.display = "none"
}
if(e.target === animePopup){
animePopup.style.display = "none"
}
}

/* GUILD BUTTON CLICK → OPEN POPUP */
const joinButtons = document.querySelectorAll(".guildBtn")

joinButtons.forEach(btn => {

btn.addEventListener("click", function(e){

e.preventDefault()

const link = btn.getAttribute("data-link")
const guild = btn.getAttribute("data-guild")

localStorage.setItem("ccaRedirect", link)
localStorage.setItem("ccaGuild", guild)

popup.style.display = "flex"

})

})

/* SUBMIT JOIN FORM */
if(submitJoin){

submitJoin.addEventListener("click", () => {

const username = document.getElementById("username").value
const age = document.getElementById("age").value
const guild = localStorage.getItem("ccaGuild")
const anime = document.getElementById("animeWatched").value

if(username === "" || age === "" || anime === ""){
alert("Fill all fields")
return
}

/* MEMBER COUNT */
let count = localStorage.getItem("ccaCount")
count = count ? parseInt(count) + 1 : 1
localStorage.setItem("ccaCount", count)

/* FORMAT */
const num = String(count).padStart(3, "0")
const letter = guild.charAt(0).toUpperCase()

const memberID = "CCA-" + num + "-" + letter + age

/* SAVE */
localStorage.setItem("ccaUser", username)
localStorage.setItem("ccaAge", age)
localStorage.setItem("ccaAnime", anime)
localStorage.setItem("ccaID", memberID)

alert("Welcome " + username + "\nID: " + memberID)

/* REDIRECT */
const redirect = localStorage.getItem("ccaRedirect")

popup.style.display = "none"

if(redirect){
localStorage.removeItem("ccaRedirect")
window.location.href = redirect
}

})

}

/* FEATURED + TRENDING */
function addAnime(id, container){

fetch("https://api.jikan.moe/v4/anime/" + id)
.then(res => res.json())
.then(data => {

const anime = data.data

const card = document.createElement("div")
card.className = "anime-card"

card.innerHTML = `
<img src="${anime.images.jpg.image_url}">
<h3>${anime.title}</h3>
<p>⭐ ${anime.score}</p>
`

card.onclick = () => openAnimePopup(anime.title)

container.appendChild(card)

})

}

const featured = document.querySelector(".anime-grid")
const trending = document.getElementById("trendingTrack")

if(featured){
addAnime(16498, featured)
addAnime(40748, featured)
}

if(trending){
addAnime(21, trending)
addAnime(5114, trending)
}

/* ANIME POPUP */
async function openAnimePopup(title){

const query = `
query ($search: String) {
Media(search: $search, type: ANIME) {
title { romaji }
coverImage { large }
averageScore
}
}`

const res = await fetch("https://graphql.anilist.co", {
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({ query, variables:{ search:title } })
})

const data = await res.json()
const anime = data.data.Media

popupTitle.textContent = anime.title.romaji
popupPoster.src = anime.coverImage.large
popupScore.textContent = "⭐ " + anime.averageScore

watchLink.href = "https://9anime.pe/search?keyword=" + encodeURIComponent(title)

animePopup.style.display = "flex"
}

})

/* WELCOME TEXT */
const user = localStorage.getItem("ccaUser")
const guild = localStorage.getItem("ccaGuild")
const welcome = document.getElementById("welcomeUser")

if(user && welcome){
welcome.innerText = "Welcome back, " + user + " (" + guild + ")"
}

/* MEMBER ID DISPLAY */
const id = localStorage.getItem("ccaID")
const idBox = document.getElementById("memberID")

if(id && idBox){
idBox.innerText = id
}

/* CONTINUE BUTTON */
const continueBtn = document.getElementById("continueBtn")

if(continueBtn){
continueBtn.onclick = () => window.location.href = "home.html"
}

/* RESET */
function resetCCA(){
localStorage.clear()
window.location.href = "index.html"
}

/* SIDEBAR TOGGLE */
const menuBtn = document.getElementById("menuBtn")
const sidebar = document.getElementById("sidebar")

if(menuBtn){
menuBtn.onclick = () => {
sidebar.classList.toggle("active")
}
}

/* PROFILE PANEL */
const profileBtn = document.getElementById("profileBtn")
const profilePanel = document.getElementById("profilePanel")

if(profileBtn){
profileBtn.onclick = () => {
profilePanel.classList.toggle("active")
}
}

/* LOAD PROFILE DATA */
const pName = document.getElementById("profileName")
const pGuild = document.getElementById("profileGuild")
const pID = document.getElementById("profileID")

const user = localStorage.getItem("ccaUser")
const guild = localStorage.getItem("ccaGuild")
const id = localStorage.getItem("ccaID")

if(pName) pName.innerText = user || "Guest"
if(pGuild) pGuild.innerText = guild || "No Guild"
if(pID) pID.innerText = id || ""