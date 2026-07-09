"use client";
import { useState } from "react";
import SearchWeatherComponent from "./search-component";
import useChooseCity from "@/hooks/use-choose-city";

const WeatherComponent = () => {
  const [text, setText] = useState("");
  const { data, setchosenCity, loading, setData } = useChooseCity();

  return (
    <div>
      <SearchWeatherComponent
        text={text}
        setText={setText}
        setchosenCity={setchosenCity}
        setData={setData}
      />

      <div>
        {data ? (
          <div>
            <h3>{data.name}</h3>
            <p>{Math.round(data.main.temp)}°C</p>
            <p>{data.weather[0].description}</p>
          </div>
        ) : loading ? (
          <div>Loading...</div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherComponent;
