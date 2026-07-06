import React, { Dispatch, SetStateAction } from "react";

interface SearchWeatherComponentProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  weatherHandler: () => void;
}

const SearchWeatherComponent = ({
  text,
  setText,
  weatherHandler,
}: SearchWeatherComponentProps) => {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input value={text} onChange={searchHandler} />
      <button onClick={weatherHandler}>search</button>
    </div>
  );
};

export default SearchWeatherComponent;
