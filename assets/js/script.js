var navToggle = document.querySelector('.hamburger-toggle'),
    hamburger = document.querySelector('.hamburger'),
    navMenu = document.querySelector('.nav-menu'),
    navLink = document.querySelectorAll('.nav-menu li'),
    input = document.querySelector('.location input'),
    city = "mumbai",
    key = "a2dbafd32bfb6d87a7dee017beec62d6";

//navigation
navToggle.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('hide');
})

navLink.forEach(function (li) {
    li.addEventListener('click', function () {
        for (i = 0; i < navLink.length; i++) {
            navLink[i].classList.remove('active');
        }
        li.classList.add('active');
    })
})

//removing white space after footer
window.addEventListener('resize', function () {
    removeWhiteSpace();
})

window.addEventListener('load', function () {
    removeWhiteSpace();
})

function removeWhiteSpace() {
    var header = document.querySelector("header"),
        footer = document.querySelector("footer"),
        main = document.querySelector("main"),
        windowHeight = window.innerHeight,
        height = windowHeight - (header.offsetHeight + footer.offsetHeight);
        
    main.style.minHeight = height + "px";
    console.log(windowHeight);
}

//Current day
var day = document.querySelector('.weather-header span:nth-of-type(1)'),
    today = new Date(),
    currentDay = today.getDay(),
    dayString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

day.innerHTML = dayString[currentDay];

//Current Date
var date = document.querySelector('.weather-header span:nth-of-type(2)');
todayDate = today.getDate();
month = today.getMonth();
monthString = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

date.innerHTML = todayDate + " " + monthString[month];

//Weather Information
var searchCity = document.querySelector('.info-container h3'),
    temperature = document.querySelector('.temperature h2'),
    button = document.querySelector('.find'),
    figure = document.querySelector('.temperature figure');

//on button click
button.addEventListener('click', function () {
    city = "";
    city += input.value;
    weatherInfo();
})

//on enter
input.addEventListener('keydown', function (e) {
    city = "";
    city += input.value;
    if (e.code == "Enter") {
        weatherInfo();
    }
})

//form
var form = document.querySelectorAll('form');
form.forEach(function (list) {
    list.addEventListener("submit", function (e) {
        e.preventDefault();
    })
})

function weatherInfo() {
    var p = fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key);
    p.then(function (response) {
        return response.json();
    }).then(function (value) {
        var info = document.querySelector('.info-container');
        error = document.querySelector('.error-message');

        if (value.cod == 200) {

            var temp = value.main.temp,
                currentTemp = temp - 273.15,
                tempIcon = document.querySelector('.temperature figure img'),
                icon = value.weather[0].main,
                humidity = document.querySelector('.weather-info li:nth-of-type(1) span'),
                speed = document.querySelector('.weather-info li:nth-of-type(2) span'),
                direction = document.querySelector('.weather-info li:nth-of-type(3) span');

            if (info.classList.contains('hide')) {
                info.classList.remove('hide');
            }

            error.classList.add('hide');
            searchCity.innerHTML = value.name;
            temperature.innerHTML = currentTemp.toFixed(1) + '&#8451;';

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
            } else if (icon == "Mist" || "Smoke" || "Haze") {
                tempIcon.src = "./assets/images/icons/icon-7.svg";
            }
            else {
                tempIcon.src = "./assets/images/icons/icon-1.svg";
            }

            humidity.innerHTML = value.main.humidity + "%";
            speed.innerHTML = value.wind.speed + "m/sec";
            direction.innerHTML = value.wind.deg + "deg";
        }

        if (value.cod == 404 || value.cod == 400) {
            info.classList.add('hide');
            error.classList.remove('hide');
        }

    })
}
weatherInfo();

