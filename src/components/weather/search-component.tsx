import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { City } from "country-state-city";
import { Icon } from "@iconify/react";

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
    setText("");
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
      <div className="relative w-[300px] h-full">
        <input
          value={text}
          onChange={searchHandler}
          minLength={2}
          className="w-full h-[24px] py-2 pr-[12px] pl-[4px] border-2 rounded-sm border-blue-500 text-sm focus:outline-0 focus:border-blue-500 "
        />
        {text && (
          <Icon icon="iconamoon:close-bold"  className="absolute right-[4px] top-[4px] z-50 hover:text-red-500 cursor-pointer "
            onClick={resetSearch}/>
        )}

        {menu && text.length > 2 && (
          <div className="max-h-[300px] overflow-y-auto absolute top-[38px] left-0 min-h-[100px] h-full w-full bg-gray-50/50 backdrop-blur-sm p-2 z-50 rounded-md">
            {!cities ? (
              <div>loading</div>
            ) : (
              cities
                .filter((city) =>
                  city.toLowerCase().startsWith(text.toLowerCase()),
                )
                .map((city, index) => (
                  <li
                    onClick={() => chosenCityHandler(city)}
                    key={index}
                  >
                    {city}
                  </li>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWeatherComponent;
