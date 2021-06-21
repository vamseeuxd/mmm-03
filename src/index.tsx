import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {FirebaseProvider} from "./providers/firebase-context/firebase-context";
import {ThemeProvider} from "./providers/theme-context/theme-context";
require('dotenv').config();

ReactDOM.render(
    /*<React.StrictMode>*/
    <FirebaseProvider>
        <ThemeProvider>
        <App/>
        </ThemeProvider>
    </FirebaseProvider>
    /*</React.StrictMode>*/,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
    onUpdate: (e) => {
        const {waiting: {postMessage = null} = {} as any, update} = e || {};
        if (postMessage) {
            postMessage({type: 'SKIP_WAITING'});
        }
        update().then(() => {
            window.location.reload();
        });
    },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
