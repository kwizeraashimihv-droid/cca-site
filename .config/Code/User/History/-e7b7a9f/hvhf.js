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

const href = link.getAttribute("href")

if(href === current){
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

const featured = document.querySelector(".anime-grid")
const trending = document.getElementById("trendingTrack")

const popup = document.getElementById("animePopup")
const closePopup = document.getElementById("closePopup")

const popupTitle = document.getElementById("popupTitle")
const popupPoster = document.getElementById("popupPoster")
const popupScore = document.getElementById("popupScore")
const popupSynopsis = document.getElementById("popupSynopsis")
const watchLink = document.getElementById("watchLink")


/* CLOSE POPUP */
if(closePopup){
closePopup.onclick = function(){
popup.style.display = "none"
}
}


/* ANIME CARD BUILDER */
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

/* CLICK EVENT */
card.addEventListener("click", function(){
openAnimePopup(anime.title)
})

container.appendChild(card)

})

}


/* LOAD SECTIONS */
if(featured){

addAnime(16498, featured)
addAnime(40748, featured)

}

if(trending){

addAnime(21, trending)
addAnime(5114, trending)

}


/* POPUP FUNCTION */
async function openAnimePopup(animeTitle){

const query = `
query ($search: String) {
Media(search: $search, type: ANIME) {
title { romaji }
coverImage { large }
averageScore
description
}
}
`

const variables = { search: animeTitle }

const response = await fetch("https://graphql.anilist.co", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ query, variables })
})

const data = await response.json()
const anime = data.data.Media

popupTitle.textContent = anime.title.romaji
popupPoster.src = anime.coverImage.large
popupScore.textContent = "Score: " + anime.averageScore

watchLink.href = "https://9anime.pe/search?keyword=" + encodeURIComponent(animeTitle)

popup.style.display = "flex"
}

})

const landingJoinBtn = document.getElementById("joinBtn")
const mainContent = document.getElementById("mainContent")
const header = document.getElementById("header")

if(landingJoinBtn){

landingJoinBtn.onclick = function(){

mainContent.style.display = "block"
header.style.display = "block"

window.scrollTo({
top: mainContent.offsetTop,
behavior: "smooth"
})

}

}
const joinButtons = document.querySelectorAll(".guildBtn")
const popup = document.getElementById("joinPopup")
const closeJoin = document.getElementById("closeJoin")

joinButtons.forEach(btn => {

btn.addEventListener("click", function(e){

e.preventDefault()

btn.classList.add("btn-rim")

setTimeout(() => {

const parent = btn.closest(".guild-card")
window.location.href = parent.getAttribute("onclick").match(/'(.*)'/)[1]

}, 700)

})

})

const mainJoin = document.getElementById("joinBtn")

if(mainJoin){

mainJoin.addEventListener("click", function(){

mainJoin.classList.add("btn-rim")

setTimeout(() => {

window.location.href = "index.html"

}, 700)

})

}

closeJoin.onclick = ()=>{
popup.style.display = "none"
}

const submitJoin = document.getElementById("submitJoin")

if(submitJoin){

submitJoin.addEventListener("click", () => {

const username = document.getElementById("username").value
const age = document.getElementById("age").value
const guild = document.getElementById("guildSelect").value
const anime = document.getElementById("animeWatched").value

if(username === "" || age === "" || anime === ""){
alert("Fill all fields")
return
}

// MEMBER NUMBER
let memberCount = localStorage.getItem("ccaCount")

if(!memberCount){
memberCount = 1
}else{
memberCount = parseInt(memberCount) + 1
}

localStorage.setItem("ccaCount", memberCount)

// FORMAT NUMBER (001, 002...)
let formattedNumber = String(memberCount).padStart(3, "0")

// GUILD LETTER
let guildLetter = guild.charAt(0).toUpperCase()

// FINAL ID
let memberID = "CCA-" + formattedNumber + "-" + guildLetter + age

// SAVE DATA
localStorage.setItem("ccaUser", username)
localStorage.setItem("ccaAge", age)
localStorage.setItem("ccaGuild", guild)
localStorage.setItem("ccaAnime", anime)
localStorage.setItem("ccaID", memberID)

alert("Welcome to CCA\nYour ID: " + memberID)

document.getElementById("joinPopup").style.display = "none"

})

}

window.onclick = function(e){
if(e.target === popup){
popup.style.display = "none"
}
}

const joinButtons = document.querySelectorAll(".guildBtn")

joinButtons.forEach(btn => {

btn.addEventListener("click", function(e){

e.preventDefault()

const guild = btn.getAttribute("data-guild")

localStorage.setItem("ccaGuild", guild)

btn.classList.add("btn-rim")

setTimeout(() => {

const parent = btn.closest(".guild-card")
window.location.href = parent.getAttribute("onclick").match(/'(.*)'/)[1]

}, 700)

})

})

const savedGuild = localStorage.getItem("ccaGuild")

if(savedGuild){

document.querySelectorAll(".guild-card").forEach(card => {

const btn = card.querySelector(".guildBtn")

if(btn && btn.getAttribute("data-guild") === savedGuild){

card.style.border = "1px solid #7a5cff"
card.style.boxShadow = "0 0 25px rgba(122,92,255,0.5)"

}

})

}

const user = localStorage.getItem("ccaUser")
const guild = localStorage.getItem("ccaGuild")

const welcomeText = document.getElementById("welcomeUser")

if(user && welcomeText){

welcomeText.innerText = "Welcome back, " + user + " (" + guild + ")"

}

const continueBtn = document.getElementById("continueBtn")

if(continueBtn){
continueBtn.onclick = () => {
window.location.href = "home.html"
}
}

function resetCCA(){
localStorage.clear()
window.location.href = "index.html"
}

const memberID = localStorage.getItem("ccaID")
const idDisplay = document.getElementById("memberID")

if(memberID && idDisplay){
idDisplay.innerText = memberID
}