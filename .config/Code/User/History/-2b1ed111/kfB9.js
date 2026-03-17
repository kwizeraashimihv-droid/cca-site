/* LOAD HEADER */
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

/* LOAD FOOTER */
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

/* ACTIVE TAB */
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

/* TRENDING SCROLL */
function scrollTrending(direction){

const track = document.getElementById("trendingTrack")

if(!track) return

track.scrollBy({
left: direction * 300,
behavior: "smooth"
})

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

container.appendChild(card)

})

}

/* LOAD ANIME SECTIONS */
document.addEventListener("DOMContentLoaded", function(){

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

})
