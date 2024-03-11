import React,{ useState } from 'react'
import ThemeContext from './ThemeContext';

const ThemeContextProvider = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState(lightTheme);
    
    return (
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider