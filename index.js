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

// Using observer intersection api for the scroll to view


const options = {
    rootMargin:"0px",
    threshold: 0.5
};

const observer = new IntersectionObserver(
    callBackFunction,
    options  // options object
    
);

function callBackFunction(entries,observer){
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            if(entry.target.className === 'services'){
                console.log("hello")
                entry.target.classList.add('fade')
            }
            if(entry.target.className === 'project'){
                console.log("hell")
                entry.target.classList.add('fade')
            }
            if(entry.target.className === 'get'){
                console.log("hel")
                entry.target.classList.add('fade')
            }
            observer.unobserve(entry.target)
        }

    })
}


observer.observe(serviceSection)
observer.observe(projectSection)
observer.observe(getSection)



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
