// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyD-K0bq-s7BPL-CGmM3n6oEBbnhKOptX_s",
    authDomain: "caleo-173a4.firebaseapp.com",
    projectId: "caleo-173a4",
    storageBucket: "caleo-173a4.appspot.com",
    messagingSenderId: "254109671206",
    appId: "1:254109671206:web:0971ba51781eb74a03abe7",
    measurementId: "G-3ENGR30K0H"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});
