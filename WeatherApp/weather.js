const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const searchInput = $('.search-input');
const searchBtn = $('.search-box button');

async function fetchData(city) {
    try {
        const responseCoordinates = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=1&appid=979322e8a48b71c2eb169a5af81da036`);
        const coordinatesData = await responseCoordinates.json();
        if (coordinatesData.length == 0) return {weatherData: '', dateData:''};
        const latitude = coordinatesData[0].lat;
        const longtitude = coordinatesData[0].lon;
        const responseDate = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=DZJO85QQM73D&format=json&by=position&lat=${latitude}&lng=${longtitude}`);
        const dateData = await responseDate.json();
        const responseWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=979322e8a48b71c2eb169a5af81da036`);
        const weatherData = await responseWeatherData.json();
        return {weatherData, dateData};
    } catch (error) {
        console.log('Lỗi')
    }
}
function renderWeather(searchInput) {
    const city = searchInput.value.trim();

    if (city == '') return;

    fetchData(city).then((data) =>  {
        const { weatherData } = data;
        const { dateData } = data;
        const weatherImg = $('.weather-img img');
        const container = $('.container');
        const centre = $('.centre');
        const time = $('.time');
        const footer = $('.footer');
        const centreDetails = $('.centre .weather-details');
        if (!weatherData || !dateData) {
            weatherImg.src = 'notfound.png';
            container.style.height = '400px';
            centre.classList.add('fade-in');
            footer.classList.remove('fade-in');
            centreDetails.innerHTML = '<p>Oops! Invalid location :/</p>'
            time.innerHTML = '';
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

        container.style.minHeight = '580px';
        centre.classList.add('fade-in');
        footer.classList.add('fade-in');
        const humidityData = $('.humidity-data');
        const windData = $('.wind-data');
        const splitTime = dateData.formatted.split(' ');
        time.innerHTML = `
            <p>${splitTime[0]}</p>
            <br>
            <p>${splitTime[1]}</p>
        `;
        centreDetails.innerHTML = 
        `<p class="temperature">${parseInt(weatherData.main.temp) - 273}°C</p>
        <p class="describe">${weatherData.weather[0].main}</p>
        `
        humidityData.innerText = `${weatherData.main.humidity}%`;
        windData.innerText = `${weatherData.wind.speed}Km/h`;
    });
}

searchBtn.addEventListener('click', () => {
    renderWeather(searchInput);
})
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        renderWeather(searchInput);
    }
})

const body = $('body');
const control = $('.control')
const switchBtn = $('#switch');
switchBtn.addEventListener('change', () => {
    if (!body.classList.contains('dark')) {
        control.style.transform = 'translateX(200%)';
    } else {
        control.style.transform = '';
    }
    body.classList.toggle('dark');
})