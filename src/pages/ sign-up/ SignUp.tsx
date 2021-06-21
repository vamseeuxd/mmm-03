import React, {useCallback, useContext} from "react";
import {withRouter} from 'react-router';
import app from "../../base";
import {Button, H5, Subtitle1, TextField} from "ui-neumorphism";
import {ThemeContext} from "../../providers/theme-context/theme-context";
import { Link } from "react-router-dom";

const SignUp = (props: { history: any }) => {
    const {isDark} = useContext(ThemeContext);
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            props.history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [props.history]);

    return (
        <div className="d-flex mt-5 pt-5 justify-content-center align-items-center mx-5 flex-column">
            <H5 className="text-center w-100" dark={isDark}>Signup</H5>
            <form autoComplete="off" className="w-100 mt-5" onSubmit={handleSignUp}>
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
                    <Link to="/login">
                        <Button text className="me-3 text-decoration-none" dark={isDark}>Login</Button>
                    </Link>
                    <Button dark={isDark}>Signup</Button>
                </div>
            </form>
        </div>
    );
};

export default withRouter(SignUp);
