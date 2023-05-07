import React, { createContext, useState } from "react";

const ThemeContext = createContext();
const ThemeContextProvider = ({children}) => {
    const themes = {
        light: {
            name: "light",
            colorPrimary: "white"
        },
        dark: {
            name:"dark",
            colorPrimary: "dark"
        }
    }
    const [themeMode, setThemeMode] = useState(themes.light)
    const toggleThemeMode = () => {
        setThemeMode(themeMode.name === "light" ? themes.dark : themes.light)
    }
    
    return (
        <ThemeContext.Provider value={{themeMode, toggleThemeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}