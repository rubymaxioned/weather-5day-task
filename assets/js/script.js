var navToggle = document.querySelector('.hamburger-toggle');
var hamburger = document.querySelector('.hamburger');
var navMenu = document.querySelector('.nav-menu');
var city = "mumbai";
var key = "a2dbafd32bfb6d87a7dee017beec62d6";

var today = new Date();
var day = today.getDay();
var dayString = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
console.log(dayString[day - 1]);

navToggle.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('show');
})

function myFunction() {
    var p = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    p.then(function (response) {
        return response.json();
    }).then(function (value) {
        console.log(value);
    })
}

myFunction();