const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchInput = $('.search-input');
const searchBtn = $('.search-box button');
const temperature = $('.temperature');
const describe = $('.describe');
const weatherImg = $('.weather-img img');
const humidityData = $('.humidity-data');
const windData = $('.wind-data');

async function fetchData(city) {
    try {
        const responseCoordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=1&appid=979322e8a48b71c2eb169a5af81da036`);
        const coordinatesData = await responseCoordinates.json();
        const latitude = coordinatesData[0].lat;
        const longtitude = coordinatesData[0].lon;
        const responseWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=979322e8a48b71c2eb169a5af81da036`);
        const weatherData = await responseWeatherData.json();
        return weatherData;
    } catch (error) {
        console.error('Lỗi', error)
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    fetchData(city).then((weatherData) =>  {
        console.log(weatherData)
        switch ( weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = 'cloud.png';
                break;

            case 'Thunderstorm':
                weatherImg.src = 'thunderstorm.png';
                break;

            case 'Drizzle':
                weatherImg.src = 'drizzle.png';
                break;
            case 'Rain':
                weatherImg.src = 'rain.png';
                break;

            case 'Snow':
                weatherImg.src = 'snow.png';
                break;

            case 'Clear':
                weatherImg.src = 'clear.png';
                break;

            case 'Mist':
                weatherImg.src = 'mist.png';
                break;

            default: weatherImg.src = '';
        }

        temperature.innerText = `${parseInt(weatherData.main.temp) - 273}°C`;
        describe.innerText = weatherData.weather[0].main;
        humidityData.innerText = `${weatherData.main.humidity}%`;
        windData.innerText = `${weatherData.wind.speed}Km/h`

    });
})
