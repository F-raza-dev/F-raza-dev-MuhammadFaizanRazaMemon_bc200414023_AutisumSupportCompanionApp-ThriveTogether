import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    backgroundColor: '#009688',
    textColor: '#333',
  });

  const changeTheme = (color) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      backgroundColor: color,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
