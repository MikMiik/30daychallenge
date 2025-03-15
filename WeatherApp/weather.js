const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const container = $('.container');
const centre = $('.centre');
const centreDetails = $('.centre .weather-details');
const footer = $('.footer');
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
        if (coordinatesData.length == 0) return weatherData = '';
        const latitude = coordinatesData[0].lat;
        const longtitude = coordinatesData[0].lon;
        const responseWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=979322e8a48b71c2eb169a5af81da036`);
        const weatherData = await responseWeatherData.json();
        return weatherData;
    } catch (error) {
        console.log('Lỗi')
    }
}

searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city == '') return;
    fetchData(city).then((weatherData) =>  {
        console.log(weatherData)
        if (!weatherData) {
            weatherImg.src = 'notfound.png';
            container.style.height = '400px';
            centre.classList.add('fade-in');
            footer.classList.remove('fade-in');
            centreDetails.innerHTML = '<p>Oops! Invalid location :/</p>'
            return;
        }
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
        container.style.height = '540px';
        centre.classList.add('fade-in');
        footer.classList.add('fade-in');

        centreDetails.innerHTML = 
        `<p class="temperature">${parseInt(weatherData.main.temp) - 273}°C</p>
        <p class="describe">${weatherData.weather[0].main}</p>
        `
        humidityData.innerText = `${weatherData.main.humidity}%`;
        windData.innerText = `${weatherData.wind.speed}Km/h`;
    });
})
