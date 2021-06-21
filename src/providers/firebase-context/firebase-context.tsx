import React from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {Observable} from "rxjs";
import {collectionData} from "rxfire/firestore";
import app from "../../base";

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
