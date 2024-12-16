// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [userTheme, setUserTheme] = useState('light'); // Default to light mode

  const toggleTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ userTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
