import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyALWSwhIeLipdMTtz4c-Y3n_c4nh18wM_s",
    authDomain: "rescute-95042.firebaseapp.com",
    databaseURL: "https://rescute-95042.firebaseio.com",
    projectId: "rescute-95042",
    storageBucket: "rescute-95042.appspot.com",
    messagingSenderId: "406626148380",
    appId: "1:406626148380:web:3ebfb113cbcab713707fd9",
    measurementId: "G-50BTBFYK5S"
};

var fbApp = firebase.initializeApp(config);

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()
// create useful endpoints within the database
export const petsRef = db.ref('Dogs')
export const ownersRef = db.ref('User')
