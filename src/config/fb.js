// Configuración de firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Para usar firestore
import {getFirestore} from 'firebase/firestore'

// Para llamar a las variables de entorno
import Constants from "expo-constants";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain:  Constants.manifest.extra.authDomain,
    projectId:  Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databaseURL: Constants.manifest.extra.databaseURL
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Se exporta la información de la base de datos
export const database = getFirestore();