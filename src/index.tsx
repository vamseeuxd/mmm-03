import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {FirebaseContext, ITheme} from "./providers/firebase-context";
import firebase from "firebase";
import {collectionData} from "rxfire/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBUFGjf40MOCAVJ6HW5AgxX93qy8LRgP64",
    authDomain: "mmm-03.firebaseapp.com",
    projectId: "mmm-03",
    storageBucket: "mmm-03.appspot.com",
    messagingSenderId: "768663313224",
    appId: "1:768663313224:web:cc86d468ec536ba2f5f17d",
    measurementId: "G-351BLTK5TP"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const themesRef = db.collection('themes');
themesRef.orderBy('createdAt');
const themesCollection = collectionData<ITheme>(themesRef, 'id');
const firebaseProvider = {
    themes: {
        ref: themesRef,
        collection: themesCollection,
        path: 'themes',
        getDoc: (id?: string) => {
            return id ? db.doc(`themes/${id}`) : themesRef.doc();
        },
    }
}


ReactDOM.render(
    /*<React.StrictMode>*/
    <FirebaseContext.Provider value={firebaseProvider}>
        <App/>
    </FirebaseContext.Provider>
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
