"use client";
import { useEffect, useState } from "react";

const useChooseCity = () => {
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    weatherHandler();
  }, [chosenCity]);

  return {
    chosenCity,
    setchosenCity,
    data,
    setData,
    loading,
    setLoading,
    weatherHandler,
  };
};

export default useChooseCity;
