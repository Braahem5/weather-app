import React from 'react';

const WeatherDisplay = ({ data, unit }) => {
    const { main, wind, weather } = data;

    const temperature = unit === 'metric' ? main.temp : (main.temp * 9/5) + 32; // Convert to Fahrenheit if needed

    return (
        <div className="weather-display">
            <h2>{data.name}</h2>
            <p>Temperature: {temperature.toFixed(2)} °{unit === 'metric' ? 'C' : 'F'}</p>

            <p>Humidity: {main.humidity} %</p>
            <p>Wind Speed: {wind.speed} m/s</p>
            <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={weather[0].description} />
        </div>
    );
};

export default WeatherDisplay;
