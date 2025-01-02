const apiGeoLocation = {
    endpoint:"https://ipgeolocation.abstractapi.com/v1/",
    key:"25d651818348458ea4cad4e24d76e9e0"
}


const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "f2e9ab2277aceffb502cea4c4563ae0c",
};

const input = document.querySelector("#input");
input.addEventListener("keypress", enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value);
    }
}


async function getGeoLocation() {
    const resGeoLocation = await fetch(`${apiGeoLocation.endpoint}?api_key=${apiGeoLocation.key}`);
    const resultGeoLocation = await resGeoLocation.json();
    console.log(resultGeoLocation); 
    getInfo(resultGeoLocation.city);   
}

getGeoLocation();
async function getInfo(data) {
    const res = await fetch(
        `${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`
    );
    const result = await res.json();
    displayResult(result);
}

function displayResult(result) {
    let city = document.querySelector("#city");
    city.textContent = `${result.name}, ${result.sys.country}`;

    getOurDate();

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(result.main.temp)} <span>°</span>`;

    let feelsLike = document.querySelector("#feelsLike");
    feelsLike.innerHTML = `<i class="fas fa-temperature-high"></i> ` + "Feels like: " + `${Math.round(result.main.feels_like)}` + `<span>°</span>`;

    let wind = document.querySelector('#wind');
    wind.innerHTML = `<i class="fas fa-wind"></i> ` + "Wind: " + `${result.wind.speed}` + `<span> m/s</span>`;

    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = `<i class="fas fa-tint"></i> ` + "Humidity: " +`${result.main.humidity}` + `<span> %</span>`;



    let conditions = document.querySelector("#conditions");
    conditions.textContent = `${result.weather[0].main}`;

    let variation = document.querySelector("#variation");
    variation.innerHTML =
        "Min: " +
        `${Math.round(result.main.temp_min)}<span>°</span>` +
        " " +
        "Max " +
        `${Math.round(result.main.temp_max)}<span>°</span>`;
}

function getOurDate() {
    const myDate = new Date();
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let day = days[myDate.getDay()];

    let todayDate = myDate.getDate();

    let month = months[myDate.getMonth()];

    let year = myDate.getFullYear();

    let showDay = document.querySelector("#day");
    showDay.textContent =
        `${day}`;

    let showDate = document.querySelector("#date");
    showDate.textContent =
        `${todayDate}` + " " + `${month}` + " " + `${year}`;
}


gsap.from ('#name', {duration: 1.5, y: -200})
gsap.from ('#icon', {duration: 1.5, x: -200})

gsap.from ('#input', {duration: 2,  opacity: 0, delay: 1})
gsap.from ('#city', {duration: 2,  opacity: 0, delay: 2})
gsap.from ('#day', {duration: 2,  opacity: 0, delay: 2.5})
gsap.from ('#date', {duration: 2,  opacity: 0, delay: 3})


gsap.from ('#temperature', {duration: 2,  opacity: 0, delay: 4})
gsap.from ('#conditions', {duration: 2,  opacity: 0, delay: 4.5})
gsap.from ('#feelsLike', {duration: 2,  opacity: 0, delay: 5})
gsap.from ('#wind', {duration: 2,  opacity: 0, delay: 5.5})
gsap.from ('#humidity', {duration: 2,  opacity: 0, delay: 6})
