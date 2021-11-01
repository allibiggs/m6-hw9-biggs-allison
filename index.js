// grab references to form, input, and #movie
var formEl = document.querySelector('form')
var inputEl = document.querySelector('input')
var weatherEl = document.getElementById('weather')

// attach submit to form event
// fetch movie data if there is a query
// call render movie function
formEl.onsubmit = function(e) {
  e.preventDefault()
  var weatherQuery = inputEl.value.trim()
  if (!weatherQuery) return
  fetch('http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=54b4fc35bda7bca5b212ff07c6adce55&q=' + weatherQuery)
  .then(function(res) {
    return res.json()
  })
  .then(function(res) {
    console.log(res)
    renderWeather(res)
    inputEl.value = ""
  })
  .catch(function(err) {
    console.log(err)
  })
}

function renderWeather(weatherObj) {
  // clear previous movie
  weatherEl.innerHTML = ""
  // handle movie not found
  if (weatherObj.Response === 'False') {
    weatherEl.textContent = 'Location not found'
    return
  }

  // render location
  var locationEl = document.createElement('h2')
  locationEl.textContent = weatherObj.name + ", " + weatherObj.sys.country
  weatherEl.appendChild(locationEl)

  // render map link
  // var mapLink = document.createElement('a')
  // mapLink.textContent = weatherObj.weather[0]
  // mapLink.href = weatherObj.weather[0]
  // weatherEl.appendChild(mapLink)

  // render icon image
  var icon = document.createElement('img')
  icon.src = weatherObj.weather.icon
  icon.alt = weatherObj.weather[0].description
  weatherEl.appendChild(icon)

  // render plot summary
  var description = document.createElement('h3')
  description.textContent = weatherObj.weather[0].description
  weatherEl.appendChild(description)

    // render temp
    var temp = document.createElement('h3')
    temp.textContent = "Current: " +  weatherObj.main.temp
    weatherEl.appendChild(temp)

    // render temp
    var feelsLike = document.createElement('h3')
    feelsLike.textContent = "Feels Like: " +  weatherObj.main.feels_like
    weatherEl.appendChild(feelsLike)

    // render temp
    var lastUpdated = document.createElement('h3')
    lastUpdated.textContent = "Last Updated: " + weatherObj.id
    weatherEl.appendChild(lastUpdated)

  // loop over ratings and render each rating
  // for (var rating of weatherObj.Ratings) {
  //   var ratingEl = document.createElement('h5')
  //   ratingEl.textContent = rating.Source + ': ' + rating.Value
  //   weatherEl.appendChild(ratingEl)
  // }
}