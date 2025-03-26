import React, { useState } from 'react';

import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import './App.css';

const App = () => {
    const [city, setCity] = useState(''); 
    const [weatherData, setWeatherData] = useState(null);
    const [unit, setUnit] = useState('metric'); // State for temperature unit

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeatherData = async () => {
        if (!city) return;
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${unit}`);
            setWeatherData(response.data);
        } catch (err) {
            setError('City not found');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div className="App">
            <h1>Weatherly</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="Enter city" 
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData && (
                <>
<WeatherDisplay data={weatherData} unit={unit} />

                    <button onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
                        Switch to {unit === 'metric' ? '°F' : '°C'}
                    </button>
                </>
            )}
        </div>
    );
};

export default App;
