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
popupSynopsis.innerHTML = anime.description

watchLink.href = "https://9anime.pe/search?keyword=" + encodeURIComponent(animeTitle)

popup.style.display = "flex"
}

})