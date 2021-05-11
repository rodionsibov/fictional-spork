import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAAfvLQh6t4x2KKp3VQ0VfiPMRsA9U1lfA",
    authDomain: "vue-chat-b5897.firebaseapp.com",
    projectId: "vue-chat-b5897",
    storageBucket: "vue-chat-b5897.appspot.com",
    messagingSenderId: "178908762730",
    appId: "1:178908762730:web:5edf18d556b7f105a97013"
};

const db = firebase.initializeApp(firebaseConfig);

export default db
