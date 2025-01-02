const slides = document.querySelectorAll('.slider');
const navBar = document.querySelector('.navbar');
const sideBar = document.querySelector('.sidebar');

const nav = 'fa-bars';
const cancel = 'fa-xmark';

navBar.addEventListener('click', function () {
    // Rotate icon and toggle sidebar
    navBar.classList.toggle('rotate');
    const isOpen = sideBar.style.left === '0px';

    if (isOpen) {
        // Close the sidebar
        sideBar.style.left = '-270px';
        navBar.classList.remove(cancel);
        navBar.classList.add(nav);
    } else {
        // Open the sidebar
        sideBar.style.left = '0';
        navBar.classList.remove(nav);
        navBar.classList.add(cancel);
    }
});
slides.forEach((s,i) =>{
    s.style.transform = `translateY(${100 * i}%)`;
})

const maxSlide = slides.length - 1;
let curSlide = 0;
setInterval(() =>{

    if(curSlide === maxSlide){
        curSlide = 0;
    }
    else{
        curSlide++;
    }

    slides.forEach((s,i) =>{
        s.style.transform = `translateY(${100 * (i - curSlide)}%)`;
    })
},4000)



// Import Leaflet library
navigator.geolocation.getCurrentPosition(function(position){
    const {latitude} = position.coords;
    const {longitude} = position.coords;

    const coords = [latitude,longitude]

    const map = L.map('map').setView(coords, 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(coords).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();
}, function(){
    alert("Geolocation is not supported by this browser.");
})