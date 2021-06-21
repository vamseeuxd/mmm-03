import React, {useContext, useState} from 'react';
import 'ui-neumorphism/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import {Card, Dialog} from 'ui-neumorphism';
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import MainMenu from "./layout/MainMenu";
import {ThemeContext} from "./providers/theme-context/theme-context";
import {AuthProvider} from "./providers/auth-context/auth-context";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/ sign-up/ SignUp";

function App() {
    const {isDark} = useContext(ThemeContext);
    const [showMainMenu, setShowMainMenu] = useState(false);
    const mainPageClasses = 'rounded-0 over-flow-off vw-100 vh-100 d-flex justify-content-center align-items-center flex-row';
    const toggleMainMenu = () => {
        setShowMainMenu(!showMainMenu);
    }

    return (
        <Card flat dark={isDark} className={mainPageClasses}>
            <Card rounded dark={isDark} className='main-page-container'>
                <Header toggleMainMenu={toggleMainMenu} dark={isDark}/>
                <div className="middle-page">
                    <AuthProvider>
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={Home}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/signup" component={SignUp}/>
                            </div>
                        </Router>
                    </AuthProvider>
                </div>
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
