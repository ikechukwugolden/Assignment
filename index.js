function convertTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

async function getWeather() {
  const citySelect = document.getElementById("city");
  const selected = citySelect.options[citySelect.selectedIndex];

  
  // Dropdown selected
   if (selected.value) {
    lat = selected.getAttribute("data-lat");
    lon = selected.getAttribute("data-lon");
  } 
  else {
    alert("Select OR choose a state!");
    return;           
  }

  const API = "7e3a513d73a09143b3706a800f27e78e";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.getElementById("result").innerHTML = "Location not found!";
      return;
    }

    
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const cityName = data.name || "Unknown City";

    document.getElementById("result").innerHTML = `
      <h3>${cityName}, ${data.sys.country}</h3>

      <img src="https://openweathermap.org/img/wn/${icon}@2x.png">

      <p><strong>Weather:</strong> ${description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      <p><strong>Clouds:</strong> ${data.clouds.all}%</p>
      <p><strong>Visibility:</strong> ${(data.visibility / 1000).toFixed(1)} km</p>
      <p><strong>Sunrise:</strong> ${convertTime(data.sys.sunrise)}</p>
      <p><strong>Sunset:</strong> ${convertTime(data.sys.sunset)}</p>
    `;
  } 
  catch (error) {
    document.getElementById("result").innerHTML = "Error fetching weather.";
  }
}
