const weatherWidget = document.querySelector('#weather-widget');
const forecastList = document.querySelector('#forecast-list');

async function loadWeather() {
    if (!weatherWidget || !forecastList) {
        return;
    }

    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=21.0174&longitude=-101.2565&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto');

        if (!response.ok) {
            throw new Error('Weather request failed');
        }

        const data = await response.json();

        const current = data.current;
        const daily = data.daily;
        const weatherDescription = getWeatherDescription(current.weather_code);

        weatherWidget.innerHTML = `
            <div class="weather-main">
                <p class="weather-temp">${Math.round(current.temperature_2m)}°C</p>
                <p>${weatherDescription}</p>
            </div>
            <p class="weather-note">Updated from the local forecast feed.</p>
        `;

        forecastList.innerHTML = daily.time.slice(0, 3).map((day, index) => {
            const max = Math.round(daily.temperature_2m_max[index]);
            const min = Math.round(daily.temperature_2m_min[index]);
            const label = formatDayLabel(day);
            return `
                <article class="forecast-card">
                    <h3>${label}</h3>
                    <p>${getWeatherDescription(daily.weather_code[index])}</p>
                    <p>${max}° / ${min}°</p>
                </article>
            `;
        }).join('');
    } catch (error) {
        weatherWidget.innerHTML = '<p class="weather-note">Weather information is unavailable right now.</p>';
        forecastList.innerHTML = '<p class="weather-note">The forecast could not be loaded.</p>';
        console.error(error);
    }
}

function getWeatherDescription(code) {
    switch (code) {
        case 0:
            return 'Clear sky';
        case 1:
        case 2:
        case 3:
            return 'Partly cloudy';
        case 45:
        case 48:
            return 'Foggy';
        case 51:
        case 53:
        case 55:
            return 'Drizzle';
        case 61:
        case 63:
        case 65:
            return 'Rain';
        case 71:
        case 73:
        case 75:
            return 'Snow';
        case 80:
        case 81:
        case 82:
            return 'Showers';
        default:
            return 'Cloudy';
    }
}

function formatDayLabel(dateString) {
    const date = new Date(`${dateString}T12:00:00`);
    return date.toLocaleDateString('en', { weekday: 'short' });
}

loadWeather();
