"use strict";
const weatherContainer = document.querySelector(".weather-container");
const inputCity = document.querySelector(".input-city");
const searchBtn = document.querySelector(".search-btn");
const weatherDisplay = document.querySelector(".weather-display");

// API KEY
const apiKey = "ef7f3f1215c14f60b75183933250502";

// RENDER WEATHER TO DOM
const renderWeather = function (data) {
  // Clear previous weather data
  weatherDisplay.innerHTML = "";
  const html = ` 
                <div class="weather-info">
                    <h2 class='city'>${data.location.name}, ${data.location.country}</h2>
                    <img id="weatherIcon" src=${data.current.condition.icon} alt="Weather Icon">
                    <h1 id="temperature">${data.current.temp_c}°C</h1>
                    <p id="description">${data.current.condition.text}</p>
                 </div>
                 <div class="details">
                    <p>Humidity: <span id="humidity">${data.current.humidity}%</span></p>
                     <p>Wind: <span id="windSpeed">${data.current.wind_kph}</span> km/h</span></p>
                 </div>`;
  weatherDisplay.insertAdjacentHTML("beforeend", html);
  weatherDisplay.style.display = "flex";
};
// ERROR MESSAGE
const errorMsg = function (msg) {
  weatherContainer.insertAdjacentText("beforeend", msg);
};

// FETCH CITY DATA FROM API
function weatherData(city) {
  fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderWeather(data);
    })
    .catch((err) =>
      errorMsg(`Something went wrong: ${err.message}. Try Again`)
    );
}

// SEARCH BTN addEventListener
searchBtn.addEventListener("click", function () {
  const inputValue = inputCity.value.trim();
  if (!inputValue) return;
  weatherData(inputValue);
  inputCity.value = "";
});
inputCity.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const inputValue = inputCity.value.trim();
    if (!inputValue) return;
    weatherData(inputValue);
    inputCity.value = "";
  }
});
