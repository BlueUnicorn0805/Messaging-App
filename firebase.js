import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9mpyIfMfR0rJaJkPpn7vhHKLUZT8csV4",
    authDomain: "messaging-app-7e0b3.firebaseapp.com",
    databaseURL: "https://messaging-app-7e0b3.firebaseio.com",
    projectId: "messaging-app-7e0b3",
    storageBucket: "messaging-app-7e0b3.appspot.com",
    messagingSenderId: "273684385181",
    appId: "1:273684385181:web:0e22b16f28cd78c76cf374",
    measurementId: "G-147RZ5GT34"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };

export default db;