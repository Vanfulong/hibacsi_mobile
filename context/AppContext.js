import { useState } from "react";
import { createContext, useContext } from "react";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [city, setCity] = useState('');

  const value = {
    city: city,
    setCity : setCity
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
