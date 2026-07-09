import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { City } from "country-state-city";

interface SearchWeatherComponentProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setData: any | null;
  setchosenCity: Dispatch<SetStateAction<string>>;
}

const SearchWeatherComponent = ({
  text,
  setText,
  setData,
  setchosenCity,
}: SearchWeatherComponentProps) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [cities, setCities] = useState<string[]>([]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setMenu(true);
  };

  useEffect(() => {
    const allCities = City.getAllCities();
    const citiesName = allCities.map((city) => city.name);
    setCities(citiesName);
  }, []);

  const chosenCityHandler = (city: string) => {
    setText(city);
    setMenu(false);
    setchosenCity(city);
  };

  const resetSearch = () => {
    setText("");
    setMenu(false);
    setchosenCity("");
    setData(null);
  };

  return (
    <div>
      <div style={{position:"relative", width:"200px"}}>
        <input value={text} onChange={searchHandler} minLength={2} style={{width:"100%",height:"24px",padding:"0 12px 0 4px"}} />
        {text &&<span style={{position:"absolute",right:"4px", top:"4px",zIndex:5}} onClick={resetSearch}>*</span>}
      </div>

      {menu && text.length > 2 && (
        <div>
          {!cities ? (
            <div>loading</div>
          ) : (
            cities
              .filter((city) =>
                city.toLowerCase().startsWith(text.toLowerCase()),
              )
              .map((city, index) => (
                <li onClick={() => chosenCityHandler(city)} key={index}>
                  {city}
                </li>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWeatherComponent;
