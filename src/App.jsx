import React, { useState } from 'react';
import './App.css';
import { APIURL, callApi } from './lib';

const App = () => {

  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const IMGURL = import.meta.env.BASE_URL;

  function getData() {

    setError("");
    setData(null);

    if (city.trim() === "") {
      setError("Enter name of the city");
      return;
    }

    setIsLoading(true);

    const URL = APIURL(city);

    callApi(
      "GET",
      URL,
      "",
      (res) => {
        setData(res);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
  }

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <img src={IMGURL + "weather.png"} alt="logo" />
        Weather App
      </div>

      {/* Main Section */}
      <div className="section">

        {/* Search Box */}
        <div className="inputdiv">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getData}>Search</button>
        </div>

        {/* Error Message */}
        <div className="errMsg">{error}</div>

        {/* Weather Info */}
        {data && (
          <div className="weatherinfo">

            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="weather icon"
            />

            {/* City + Temperature */}
            <div>
              <h3>{data.name}</h3>
              <h1>{data.main.temp.toFixed(2)} °C</h1>
            </div>

            {/* Additional Details */}
            <div>
              <p>
                <span>Condition</span>
                <span>{data.weather[0].description}</span>
              </p>

              <p>
                <span>Humidity</span>
                <span>{data.main.humidity}%</span>
              </p>

              <p>
                <span>Wind Speed</span>
                <span>{data.wind.speed} m/s</span>
              </p>
            </div>

          </div>
        )}

      </div>

      {/* Footer */}
      <div className="footer">
        Copyright © 2026
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="progress">
          <img src={IMGURL + "loading.gif"} alt="loading" />
        </div>
      )}

    </div>
  );
};

export default App;