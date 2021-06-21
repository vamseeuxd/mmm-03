import React, {useCallback, useContext} from "react";
import {Redirect, withRouter} from 'react-router';
import app from "../../base";
import {AuthContext} from "../../providers/auth-context/auth-context";
import {Button, Divider, H5, Subtitle1, TextField} from 'ui-neumorphism';
import {ThemeContext} from "../../providers/theme-context/theme-context";
import {Link} from "react-router-dom";

const Login = (props: { history: any }) => {
    const {isDark} = useContext(ThemeContext);
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                props.history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [props.history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="d-flex mt-5 pt-5 justify-content-center align-items-center mx-5 flex-column">
            <H5 className="text-center w-100" dark={isDark}>Log in</H5>
            <form autoComplete="off" className="w-100 mt-5" onSubmit={handleLogin}>
                <label className="w-100">
                    <Subtitle1 dark={isDark}>Email</Subtitle1>
                    <TextField autofocus={true} className="mmm-input"
                               type="email" name="email"
                               placeholder="Email" dark={isDark}/>
                </label>
                <label className="w-100">
                    <Subtitle1 dark={isDark}>Password</Subtitle1>
                    <TextField className="mmm-input" type="password"
                               name="password" placeholder="Password" dark={isDark}/>
                </label>
                <div className="d-flex justify-content-between pt-2 px-3">
                    <Link to="/signup">
                        <Button text className="me-3 text-decoration-none" dark={isDark}>Signup</Button>
                    </Link>
                    <Button dark={isDark}>Log in</Button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(Login);
