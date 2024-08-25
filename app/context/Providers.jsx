'use client'; // Ensure this is a Client Component since it uses state

import { createContext, useState, useContext } from 'react';

// Create the Context
const GlobalContext = createContext();

// Create the Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    // Define your global state here
    user: "1234567890",
  });

  // You can add actions that modify the state here
  const setUser = (user) => setState((prevState) => ({ ...prevState, user }));
  return (
    <GlobalContext.Provider value={{ state, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
