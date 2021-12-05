import firebase from 'firebase/app';
import 'firebase/messaging';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD-K0bq-s7BPL-CGmM3n6oEBbnhKOptX_s",
    authDomain: "caleo-173a4.firebaseapp.com",
    projectId: "caleo-173a4",
    storageBucket: "caleo-173a4.appspot.com",
    messagingSenderId: "254109671206",
    appId: "1:254109671206:web:0971ba51781eb74a03abe7",
    measurementId: "G-3ENGR30K0H"
}
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const publicKey = "BEcaKiJG-eBbuoQ1I5vlxrmrwsYDFFqV95Qa3nBDJYJp3K8Ry_j_1ul30yMD43fbPRKv0X3DNdwaX-imaqMGMTk";
export const getToken = async (setTokenFound) => {
    let currentToken = '';
    try {
        currentToken = await messaging.getToken({ vapidKey: publicKey });
        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
        return currentToken;
    };
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });