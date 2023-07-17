function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.condition.description);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "eafeeoc904c0230fca8497e0fbadtfbd";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Harare&key=eafeeoc904c0230fca8497e0fbadtfbd&units=metric";
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
