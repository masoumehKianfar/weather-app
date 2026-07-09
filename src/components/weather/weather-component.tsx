"use client";
import { useEffect, useState } from "react";
import SearchWeatherComponent from "./search-component";

const WeatherComponent = () => {
  const [text, setText] = useState("");
  const [chosenCity, setchosenCity] = useState<string>("");
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiDetails = {
    base: process.env.NEXT_PUBLIC_BASE_URL,
    key: process.env.NEXT_PUBLIC_API_kEY,
  };

  const weatherHandler = async () => {
    if (!chosenCity) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${apiDetails.base}weather?q=${chosenCity}&appid=${apiDetails.key}&units=metric`,
      );

      if (!response.ok) {
        throw new Error("failed to fetch");
      }

      const result = await response.json();
      setData(result);
    } catch (error: any) {
      console.log("Oops! an error occurred!", error.message);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    weatherHandler();
  }, [chosenCity]);

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
          <div>Loading</div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherComponent;
