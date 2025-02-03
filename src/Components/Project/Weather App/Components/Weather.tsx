import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input,  Card, Spin } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";

import { useDebounce } from "./useDebounce.ts"; // Custom hook for debouncing search

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
    }
  ];
  wind: {
    speed: number;
  };
}

const NavBar = () => {

    return (
      <div className="flex fixed z-50  bottom-0 right-0 m-3  rounded-full w-50 h-14 bg-gray-600 shadow-lg text-white items-center  px-3">
        <i className="cursor-pointer animate-pulse">
          <a href={"/frontend"}><ArrowLeftOutlined /></a>
        </i>
      </div>
    );
  };

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>(""); // City input by user
  const [weather, setWeather] = useState<WeatherData | null>(null); // Weather data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
 
  
  // Debounced city input
  const debouncedCity = useDebounce(city, 500);

  useEffect(() => {
    if (debouncedCity) {
      setLoading(true);
      setError(null);

      // Fetching weather data from OpenWeatherMap API
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${debouncedCity}&appid=1694ab79037c4ecd40723f024ba74257&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("City not found or API error");
          setLoading(false);
          
        });
    }
  }, [debouncedCity]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
        <NavBar />
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>

        {/* Search input */}
        <Input
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          prefix={<SearchOutlined />}
          size="large"
          className="mb-4"
        />

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : weather ? (
          <Card className="text-center">
            <h2 className="text-xl font-semibold">{weather.name}</h2>
            <h3 className="text-lg text-gray-700">
              {weather.weather[0].main}
            </h3>
            <div className="text-4xl font-bold">
              {weather.main.temp}°C
            </div>
            <div className="text-sm text-gray-500">
              Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
            </div>
          </Card>
        ) : (
          <div className="text-gray-500 text-center">
            Enter a city name to get the weather.
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
