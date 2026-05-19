import axios from "axios";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

const getWeather = (capital) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
  );
};

export default { getWeather };