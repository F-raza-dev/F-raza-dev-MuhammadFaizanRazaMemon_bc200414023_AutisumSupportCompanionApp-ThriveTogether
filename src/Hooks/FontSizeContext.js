import React, { createContext, useState, useContext } from 'react';

// Define the available font sizes
const fontSizes = {
  small: 14,
  medium: 16,
  large: 18,
  extraLarge: 24
};

// Create a context for font size
const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(fontSizes.medium);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
export { fontSizes };
