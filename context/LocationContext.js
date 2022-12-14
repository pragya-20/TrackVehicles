import React, {createContext, useState} from 'react';
import {getProductsById} from './ProductsService';

// Global context object to access values
const GlobalLocationContext = createContext();

// global context provider
const GlobalLocationProvider = ({children}) => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  return (
    <GlobalLocationContext.Provider
      value={{
        vehicle,
        setVehicle,
        allVehicles,
        setAllVehicles,
      }}>
      {children}
    </GlobalLocationContext.Provider>
  );
};

export {GlobalLocationContext, GlobalLocationProvider};
