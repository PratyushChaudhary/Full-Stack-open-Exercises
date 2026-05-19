import React, { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Filter = ({ filteredCountries, setNewSearch }) => {
  const length = filteredCountries.length;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (length === 1) {
      weatherService
        .getWeather(filteredCountries[0].capital[0])
        .then((response) => {
          setWeather(response.data);
        });
    }
  }, [filteredCountries, length]);

  if (length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "200px", height: "auto" }}
        />
        {weather && (
          <div>
            <h2>Weather in {country.capital[0]}</h2>

            <div>Temperature {weather.main.temp} Celsius</div>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <div>Wind {weather.wind.speed} m/s</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {filteredCountries.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}

            <button onClick={() => setNewSearch(country.name.common)}>
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
