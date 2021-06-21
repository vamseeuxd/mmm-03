import React from "react";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import {Observable} from "rxjs";

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
