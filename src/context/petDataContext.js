import React, { createContext, useContext, useState } from 'react';

const PetDataContext = createContext();

export const usePetData = () => {
  return useContext(PetDataContext);
};

export const PetDataProvider = ({ children }) => {
  const [petSections, setPetSections] = useState([{ index: 1 }]);

  return (
    <PetDataContext.Provider value={{ petSections, setPetSections }}>
      {children}
    </PetDataContext.Provider>
  );
};
