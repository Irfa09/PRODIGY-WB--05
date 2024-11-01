const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API Key
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Fetch weather data from API
async function getWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod !== 200) {
      alert('Location not found. Please enter a valid location.');
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Display weather data
function displayWeather(data) {
  weatherDisplay.style.display = 'block';
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Handle form submission for user-inputted location
document.getElementById('location-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const location = document.getElementById('location-input').value;
  getWeather(location);
});

// Use Geolocation API to get current location weather
document.getElementById('current-location-btn').addEventListener('click', function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});
