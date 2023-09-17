import React, { createContext, useContext, useEffect, useState } from 'react';

const PetDataContext = createContext();

export const usePetData = () => {
  return useContext(PetDataContext);
};

export const PetDataProvider = ({ children }) => {

  const initialData = localStorage.getItem('petSections') 
                     ? JSON.parse(localStorage.getItem('petSections'))
                     : [{ index: 1 }];

  const [petSections, setPetSections] = useState(initialData);

  useEffect(() => {
    localStorage.setItem('petSections', JSON.stringify(petSections));
  }, [petSections]);

  const clearDataPet = () => {
    setPetSections([{ index: 1 }]);
};


  return (
    <PetDataContext.Provider value={{ petSections, setPetSections, clearDataPet }}>
      {children}
    </PetDataContext.Provider>
  );
};
