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

function scrollTrending(direction){

const track = document.getElementById("trendingTrack")

track.scrollBy({
left: direction * 300,
behavior: "smooth"
})

}

import { featuredAnime, trendingAnime } from "./anime-data.js"

function createAnimeCard(link){

const parts = link.split("/")
const title = parts[5].replaceAll("_"," ")
const image = "https://cdn.myanimelist.net/images/anime/" + parts[4] + "/image.jpg"

const card = document.createElement("div")
card.className = "anime-card"

card.innerHTML = `
<img src="${image}">
<h3>${title}</h3>
`

return card
}


function loadFeatured(){

const container = document.querySelector(".anime-grid")

if(!container) return

featuredAnime.forEach(link=>{
container.appendChild(createAnimeCard(link))
})

}


function loadTrending(){

const container = document.getElementById("trendingTrack")

if(!container) return

trendingAnime.forEach(link=>{
container.appendChild(createAnimeCard(link))
})

}


document.addEventListener("DOMContentLoaded",function(){

loadFeatured()
loadTrending()

})
