import React from "react";

const isDarkTheme = window.localStorage.getItem('isDarkTheme');
export const ThemeContext = React.createContext<{ isDark: boolean, toggleDarkMode: (isDark: boolean) => void }>(
    {
        isDark: isDarkTheme === 'Yes',
        toggleDarkMode: (isDark: boolean) => {
        }
    }
);
