function getCityName(city) {
  let apiKey = "69eeed235833e204804be8ef21541f75";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentCity);
}

//Main API response function
function showCurrentCity(response) {
  let city = document.querySelector("#city-name");
  let temp = document.querySelector("#current-temp");
  let desc = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let imageElement = document.querySelector("#icon");
  imageElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  city.innerHTML = `${response.data.name},${response.data.sys.country}`;
  temp.innerHTML = Math.round(celsiusTemperature);
  desc.innerHTML = response.data.weather[0].description;
}
//Search button function
function searchCityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city").value;
  getCityName(searchCity);
}
//Current date function
function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dayNumber = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day}, ${dayNumber} ${month}, ${hour}:${minute}`;
}
//Main Current position function
function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "69eeed235833e204804be8ef21541f75";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showLocationTemp);
}
//API response function (referred to previous function)
function showLocationTemp(response) {
  let currentCity = document.querySelector("#city-name");
  let currenttTemp = document.querySelector("#current-temp");
  let desc = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let imageElement = document.querySelector("#icon");
  imageElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  currentCity.innerHTML = `${response.data.name},${response.data.sys.country}`;
  currenttTemp.innerHTML = Math.round(celsiusTemperature);
  desc.innerHTML = response.data.weather[0].description;
}

//function location button
function getLocationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}
// Convert to fahrenheit function
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
}

//Display city name and temperature
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", searchCityName);

//Display the current Date
let currentDay = document.querySelector("#current-day");
let now = new Date();
currentDay.innerHTML = currentDate(now);

//select location button
let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", getLocationTemp);

//convert to fahrenheitTemp
let celsiusTemperature = null;
let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
fahrenheitTemp.addEventListener("click", convertToFahrenheit);

//convert to celsius temperature
let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", convertToCelsius);
getCityName("Berlin");
