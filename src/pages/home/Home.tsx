import React, {useContext} from "react";
import {Button, H4} from "ui-neumorphism";
import app from "../../base";
import {ThemeContext} from "../../providers/theme-context/theme-context";

const Home = () => {
    const {isDark} = useContext(ThemeContext);
    return (
        <div>
            <H4 dark={isDark} className="w-100 pt-5 text-center">Under Development</H4>
            <div className="w-100 d-flex justify-content-end px-5 pt-5">
                <Button dark={isDark} onClick={() => app.auth().signOut()}>Sign out</Button>
            </div>
        </div>
    );
};

export default Home;
