var navToggle = document.querySelector('.hamburger-toggle');
var hamburger = document.querySelector('.hamburger');
var navMenu = document.querySelector('.nav-menu');
var navLink = document.querySelectorAll('.nav-menu li');
var city = "mumbai";
var key = "a2dbafd32bfb6d87a7dee017beec62d6";
console.log(navLink);

//navigation
navToggle.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('show');
})

navLink.forEach(function(li,index){
    li.addEventListener('click',function(){
        for(i=0; i<navLink.length; i++){
            navLink[i].classList.remove('active');
        }
        li.classList.add('active');
    })
})

//Current day
var day = document.querySelector('.weather-header span:nth-of-type(1)');
var today = new Date();
var currentDay = today.getDay();
var dayString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
day.innerHTML = dayString[currentDay];
console.log(currentDay);

//Current Date
var date = document.querySelector('.weather-header span:nth-of-type(2)');
var todayDate = today.getDate();
var month = today.getMonth();
var monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
date.innerHTML = `${todayDate} ${monthString[month]}`;

//Weather Information
var searchCity = document.querySelector('.info-container h3');
var temperature = document.querySelector('.temperature h2');
input = document.querySelector('.location input');
var button = document.querySelector('.find');

button.addEventListener('click', function () {
    city = "";
    city += input.value;
    myFunction();
})

function myFunction() {
    var p = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    p.then(function (response) {
        console.log(response.status);
        return response.json();
    }).then(function (value) {
        console.log(value);
        if (value.cod == 200) {
            searchCity.innerHTML = value.name;
            var temp = value.main.temp;
            var currentTemp = temp - 273.15;
            temperature.innerHTML = currentTemp.toFixed(2) + '&#8451;';

            var tempIcon = document.querySelector('.temperature figure img');
            var icon = value.weather[0].main;
            if (icon == "Drizzle") {
                tempIcon.src = "./assets/images/icons/icon-9.svg";
            } else if (icon == " Thunderstorm") {
                tempIcon.src = "./assets/images/icons/icon-12.svg";
            } else if (icon == "Rain") {
                tempIcon.src = "./assets/images/icons/icon-10.svg";
            } else if (icon == "Clear") {
                tempIcon.src = "./assets/images/icons/icon-1.svg";
            } else if (icon == "Broken clouds") {
                tempIcon.src = "./assets/images/icons/icon-3.svg";
            } else if (icon == "Clouds") {
                tempIcon.src = "./assets/images/icons/icon-5.svg";
            } else {
                tempIcon.src = "./assets/images/icons/icon-7.svg";
            }

            var humidity = document.querySelector('.weather-info li:nth-of-type(1) span');
            var speed = document.querySelector('.weather-info li:nth-of-type(2) span');
            var direction = document.querySelector('.weather-info li:nth-of-type(3) span');
            humidity.innerHTML = value.main.humidity + "%";
            speed.innerHTML = value.wind.speed + "m/sec";
            direction.innerHTML = value.wind.deg;
            console.log(direction);
        }
        if (value.cod == 404) {
            searchCity.innerHTML = "Searched City Not Found";
        }

    })
}
myFunction();