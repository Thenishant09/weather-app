let id = '9505fd1df737e20152fbd78cdb289b6a';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let sunriseTime = document.getElementById('sunrise');
let sunsetTime = document.getElementById('sunset');
let windSpeed = document.getElementById('wind-speed');
let languageSelect = document.getElementById('language');
let phoneInput = document.getElementById('phone');
let main = document.querySelector('main');

const translations = {
    en: "Weather alert: Heavy rain expected today.",
    hi: "मौसम अलर्ट: आज भारी बारिश की संभावना है।",
    gu: "હવામાન ચેતવણી: આજે ભારે વરસાદની શક્યતા છે.",
    es: "Alerta meteorológica: Se espera lluvia intensa hoy.",
    fr: "Alerte météo : De fortes pluies sont attendues aujourd'hui.",
    zh: "天气预警：今天可能有大雨。"
};

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if (valueSearch.value !== '') {
        searchWeather();
    }
});

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod === 200) {
                // Update UI with weather data
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;

                let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                sunriseTime.innerText = sunrise;
                sunsetTime.innerText = sunset;

                windSpeed.innerText = data.wind.speed + " m/s";

                // Send alert notification
                sendAlert(data.weather[0].description);
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        });
};

const sendAlert = (weatherDescription) => {
    const phone = phoneInput.value.trim();
    const language = languageSelect.value;
    const message = translations[language] || translations.en;

    if (!phone || phone.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    fetch('/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `+91${phone}`, message: `${message}\nCurrent Weather: ${weatherDescription}` }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`Alert sent to ${phone}`);
            } else {
                alert(`Failed to send alert: ${data.error}`);
            }
        })
        .catch(error => {
            console.error("Error sending alert:", error);
            alert("Error sending alert. Please try again later.");
        });
};
const initApp = () => {
    valueSearch.value = 'Vadodara';
    searchWeather();
};

initApp();
