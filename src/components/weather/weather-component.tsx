"use client";
import {  useState } from "react";
import SearchWeatherComponent from "./search-component";

const WeatherComponent = () => {
  const [text, setText] = useState("");

  const [data, setData] = useState<any>(null);
  const apiDetails = {
    base: process.env.NEXT_PUBLIC_BASE_URL,
    key: process.env.NEXT_PUBLIC_API_kEY,
  };

    const weatherHandler = async () => {
      try {
        const response = await fetch(
          `${apiDetails.base}weather?q=${text}&appid=${apiDetails.key}&units=metric`,
        );

        if (!response.ok) {
          throw new Error("failed to fetch");
        }

        const result = await response.json();
        console.log("Here is our weather data: 📦", result);
        setData(result);
      } catch (error: any) {
        console.log("Oops! an error occurred!", error.message);
      }
    };

  return (
    <div>
      <SearchWeatherComponent text={text} setText={setText} weatherHandler={weatherHandler}/>

      <div>
        {data && (
          <div>
            <h3>{data.name}</h3>
            <p>{Math.round(data.main.temp)}°C</p>
            <p>{data.weather[0].description}</p>
          </div>
        ) }
      </div>
    </div>
  );
};

export default WeatherComponent;
