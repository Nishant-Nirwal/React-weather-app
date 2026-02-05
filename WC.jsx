import { useState, useEffect } from "react";
import API_KEY from "../config";

function WC() {
  const [city, setCity] = useState("Delhi");
  const [data, setData] = useState(null);
  const [dayMin, setDayMin] = useState(null);
  const [dayMax, setDayMax] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      // 🔹 Current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const currentData = await currentRes.json();

      // 🔹 Forecast for day min & max
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      // 🔹 Calculate TODAY min & max
      const today = new Date().toISOString().split("T")[0];

      const todayTemps = forecastData.list
        .filter(item => item.dt_txt.startsWith(today))
        .map(item => item.main.temp);

      setDayMin(Math.min(...todayTemps));
      setDayMax(Math.max(...todayTemps));

      setData(currentData);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="card1">
      <div className="search">
        <input
          placeholder="Search for city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>🔍</button>
      </div>

      {data && (
        <>
          <h2>{data.name}</h2>

          {/* ✅ Current temperature */}
          <h1>{Math.round(data.main.temp)}°C</h1>

          {/* ✅ Day Max & Min */}
          {dayMin !== null && dayMax !== null && (
            <p>
              <b>
                MAX: {Math.round(dayMax)}°C &nbsp; | &nbsp;
                MIN: {Math.round(dayMin)}°C
              </b>
            </p>
          )}

          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} km/h</p>
        </>
      )}
    </div>
  );
}

export default WC;