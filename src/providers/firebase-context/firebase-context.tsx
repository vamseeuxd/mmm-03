import React from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";

export interface ITimeStamp {
    seconds: number;
    nanoseconds: number;
}

export interface ITheme {
    '--dark-bg': string;
    '--light-bg': string;
    'id'?: string;
    'name': string;
    'default': boolean;
    '--primary': string;
    'createdAt': ITimeStamp;
    '--dark-bg-dark-shadow': string;
    '--dark-bg-light-shadow': string;
    '--primary-dark': string;
    '--light-bg-light-shadow': string;
    '--light-bg-dark-shadow': string;
    '--primary-light': string;
}

export interface IFirebaseConfig<T> {
    ref: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    collection: Observable<T[]>,
    path: String,
    getDoc: (id: string) => firebase.firestore.DocumentData,
}

export interface IFirebaseContext {
    themes: IFirebaseConfig<ITheme>
}


export const FirebaseContext = React.createContext<IFirebaseContext | undefined>(undefined);


export const FirebaseProvider = (props: { children: any }) => {
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
    return (
        <FirebaseContext.Provider value={firebaseProvider}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
