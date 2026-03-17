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
