importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCpw3RSxqYQE6JO0sq95jQv0FIjdi40t2c",
    authDomain: "educational-app-f6e2a.firebaseapp.com",
    databaseURL: "https://educational-app-f6e2a.firebaseio.com",
    projectId: "educational-app-f6e2a",
    storageBucket: "educational-app-f6e2a.appspot.com",
    messagingSenderId: "151728548955",
    appId: "1:151728548955:web:7213f5ecef374575a2a37e",
    measurementId: "G-3HW6BW9B7Q"
});

const messaging = firebase.messaging();