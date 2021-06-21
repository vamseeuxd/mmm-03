import React, {useEffect, useState} from "react";
import app from "../../base";
import firebase from "firebase";

export const AuthProvider = (props: { children: any }) => {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false);
        });
    }, []);

    if (pending) {
        return <>Loading...</>
    }

    return (
        <>
            {/*@ts-ignore*/}
            {<AuthContext.Provider value={{currentUser}}>
                {props.children}
            </AuthContext.Provider>}
        </>
    );
};

export interface IAuthContext {
    currentUser: firebase.User | null
}

export const AuthContext = React.createContext({
    currentUser: null
});
