import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, useColorScheme } from 'react-native';

// styles 
interface Theme {
  primaryBackgroundColor: string,
  secondaryBackgroundColor: string,
  primaryTextColor: string,
  secondaryTextColor: String,
  isDarkMode: Boolean
}

let lightTheme: Theme = {
  primaryBackgroundColor: "#FFF",
  secondaryBackgroundColor: "#cccccc",
  primaryTextColor: "#000",
  secondaryTextColor: "#4d4d4d",
  isDarkMode: false
}

let darkTheme: Theme = {
  primaryBackgroundColor: "#111",
  secondaryBackgroundColor: "#333",
  primaryTextColor: "#FFF",
  secondaryTextColor: "#cccccc",
  isDarkMode: true
}

interface ThemeContextType {
  currentTheme: Theme,
  toggleTheme: (String) => void,
}

export const ThemeContext = createContext<ThemeContextType | undefined>({
  currentTheme: lightTheme,
  toggleTheme: () => { }
})

export const ThemeProvider = ({ children, light, dark }) => {
  useMemo(() => {
    if (light) {
      lightTheme = {
        ...lightTheme,
        primaryBackgroundColor: light.primaryBackgroundColor || "#FFF",
        secondaryBackgroundColor: light.secondaryBackgroundColor || "#cccccc",
        primaryTextColor: light.primaryTextColor || "#000",
        secondaryTextColor: light.secondaryTextColor || "#4d4d4d",
      }
    }
    if (dark) {
      darkTheme = {
        ...darkTheme,
        primaryBackgroundColor: dark.primaryBackgroundColor || "#111",
        secondaryBackgroundColor: dark.secondaryBackgroundColor || "#333",
        primaryTextColor: dark.primaryTextColor || "#FFF",
        secondaryTextColor: dark.secondaryTextColor || "#cccccc",
      }
    }

  }, [light, dark])

  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  const systemColorScheme = useColorScheme();

  const toggleTheme = (selectedValue: String) => {
    if (selectedValue === "Light") {
      setCurrentTheme(lightTheme)
    }
    else if (selectedValue === "Dark") {
      setCurrentTheme(darkTheme)
    }
  }

  useEffect(() => {
    // load the preference theme from storage on component mount
    loadInitialTheme();
  }, []);

  const loadInitialTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem('themePreference');

      if (storedTheme) {
        setCurrentTheme(JSON.parse(storedTheme));
      } else {
        // If no stored theme, use the system color scheme
        setCurrentTheme(
          systemColorScheme === 'dark' ? darkTheme : lightTheme,
        );
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };


  useEffect(() => {
    saveInitialTheme(currentTheme);
  }, [currentTheme]);

  const saveInitialTheme = async (currentTheme: Theme) => {
    try {
      await AsyncStorage.setItem(
        'themePreference',
        JSON.stringify(currentTheme),
      );
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );

}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};