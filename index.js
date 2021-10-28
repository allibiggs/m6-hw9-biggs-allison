// https://api.openweathermap.org/data/2.5/weather?q=tampa&units=imperial&appid=54b4fc35bda7bca5b212ff07c6adce55

var formEl = document.querySelector('form')
var inputEl = document.querySelector('input')
var weatherEl = document.getElementById('weather')
// console.log(formEl, inputEl, weatherEl)

formEl.onsubmit = function(e) {
  e.prevfentDefault()
  var weatherQuery = inputEl.value.trim()
  if (!weatherQuery) return 
  fetch('https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=54b4fc35bda7bca5b212ff07c6adce55&q=' + weatherQuery)
  .then(function(res) {
    return res.json()
  })
  .then(function(res) {
    console.log(res)
    renderWeather(res)
    inputEl.value = ""
  })
}

function renderWeather(weatherObj) {
  weatherEl.innerHTML = ""
  if (weatherObj.Response === 'False') {
    weatherEl.textContent = 'Location Not Found'
    return
  }

  var locationEl = document.createElement('h2')
  locationEl.textContent = weatherObj.name + "," + weatherObj.country  //need to replace city/state with real value
  weatherEl.appendChild(locationEl)

  var mapEl = document.createElement('a')
  mapEl.textContent = 'Click to view map'
  mapEl.href = '#' //need to replace href with real value
  weatherEl.appendChild(mapEl)

  var icon = document.createElement('img')
  icon.src = weatherObj.weather[3] //need to replace icon with real value
  weatherEl.appendChild(icon)

  var typeOfWeather = document.createElement('h4')
  typeOfWeather.textContent = weatherObj.weather[2] //need to replace type with real value i.e. sunny, cloudy, etc
  weatherEl.appendChild(typeOfWeather)

  var temperatureEl = document.createElement('h4')
  temperatureEl.textContent = weatherObj.main.temp + weatherObj.main.feels_like //need to replace temperature and feelslike with real value
  weatherEl.appendChild(temperatureEl)

  var lastUpdated = document.createElement('h4')
  lastUpdated.textContent = weatherObj.lastupdated //need to replace lastupdated with real value 
  weatherEl.appendChild(lastUpdated)
}