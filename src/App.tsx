import React, {useEffect, useState} from 'react';
import 'ui-neumorphism/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import {Card, Dialog} from 'ui-neumorphism';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainMenu from "./layout/MainMenu";

function App() {
    const isDarkTheme = window.localStorage.getItem('isDarkTheme');
    const [isDark, toggleDarkMode] = useState<boolean>(isDarkTheme === 'Yes');
    const [showMainMenu, setShowMainMenu] = useState(false);
    const mainPageClasses = 'rounded-0 over-flow-off vw-100 vh-100 d-flex justify-content-center align-items-center flex-row';
    const toggleMainMenu = () => {
        setShowMainMenu(!showMainMenu);
    }
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
        <Card flat dark={isDark} className={mainPageClasses}>
            <Card rounded dark={isDark} className='main-page-container'>
                <Header toggleMainMenu={toggleMainMenu} dark={isDark}/>
                <Footer dark={isDark}/>
            </Card>
            <Dialog dark={isDark} persistent={true} className='main-menu-dialog' minWidth={300}
                    visible={showMainMenu}
                    onClose={() => setShowMainMenu(false)}>
                <MainMenu toggleMainMenu={toggleMainMenu} dark={isDark}/>
            </Dialog>
        </Card>
    );
}

export default App;
