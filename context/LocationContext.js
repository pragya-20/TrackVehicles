import React, {createContext, useState} from 'react';
import {getProductsById} from './ProductsService';

// Global context object to access values
const GlobalLocationContext = createContext();

// global context provider
const GlobalLocationProvider = ({children}) => {
  const [val1, setVal1] = useState(1);
  const [allVehicles, setAllVehicles] = useState([]);
  const [vehicle, setVehicle] = useState([]);

  //   const addToMap = id => {
  //     const product = getProductsById(id);

  //     setVehicle(existingItems => {
  //       const x = existingItems.find(item => {
  //         return item.id === id;
  //       });
  //       if (!x) {
  //         return [
  //           ...existingItems,
  //           {id, product, qty: 1, totalPrice: product.price},
  //         ];
  //       } else {
  //         return existingItems.map(x => {
  //           if (x.id === id) {
  //             x.qty++;
  //             x.totalPrice += product.price;
  //           }
  //           return x;
  //         });
  //       }
  //     });
  //   };

  return (
    <GlobalLocationContext.Provider
      value={{
        val1,
        setVal1,
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
