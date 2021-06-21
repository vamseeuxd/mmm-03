import React, {useEffect, useState} from "react";

const isDarkTheme = window.localStorage.getItem('isDarkTheme');
export const ThemeContext = React.createContext<{ isDark: boolean, toggleDarkMode: (isDark: boolean) => void }>(
    {
        isDark: isDarkTheme === 'Yes',
        toggleDarkMode: (isDark: boolean) => {
        }
    }
);

export const ThemeProvider = (props: { children: any }) => {
    const isDarkTheme = window.localStorage.getItem('isDarkTheme');
    const [isDark, toggleDarkMode] = useState<boolean>(isDarkTheme === 'Yes');


    useEffect(() => {
        const isDarkTheme = window.localStorage.getItem('isDarkTheme');
        if (isDarkTheme) {
            toggleDarkMode(isDarkTheme === 'Yes')
        } else {
            toggleDarkMode(false);
            window.localStorage.setItem('isDarkTheme', 'No');
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('isDarkTheme', isDark ? 'Yes' : 'No');
    }, [isDark]);


    return (
        <ThemeContext.Provider value={{isDark, toggleDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
