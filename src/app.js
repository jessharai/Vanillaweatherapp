function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(Function (day) {
forecastHTML = forecastHTML +
    `
    <div class="col-2">
            <div class="forecast-date">Mon</div>
            <img
              src="https://openweathermap.org/img/wn/01d@2x.png"
              alt=""
              width="42"
            />
            <div class="forecast-temperature">
              <span class="forecast-temp-max"> 22°C</span>
              <span class="forecast-temp-min"> 10°C</span>
            </div>
                  </div>

        `;
    });
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function cityInput(city) {
  let apiKey = "84c9a2220b7717b5be305ba2777c0045";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  cityInput(cityInputElement.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusClick.classList.remove("active");
  fahrenheitClick.classList.add("active");
  let farenheittemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheittemperature);
}

function displaycelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusClick.classList.add("active");
  fahrenheitClick.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitClick = document.querySelector("#fahrenheit-click");
fahrenheitClick.addEventListener("click", displayFahrenheitTemp);

let celsiusClick = document.querySelector("#celsius-click");
celsiusClick.addEventListener("click", displaycelsiusTemp);

displayForecast();
cityInput("Harare");
