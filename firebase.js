// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "198559210664_API_KEY",
    authDomain: "198559210664_PROJECT_ID.firebaseapp.com",
    projectId: "198559210664_PROJECT_ID",
    storageBucket: "198559210664_PROJECT_ID.appspot.com",
    messagingSenderId: "198559210664_SENDER_ID",
    appId: "198559210664_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth reference
const auth = firebase.auth();
