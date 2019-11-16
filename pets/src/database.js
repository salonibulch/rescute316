import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBJvgUuyT8F5w-cMwHCMTqDjMyPTbIFmlE",
    authDomain: "pets-fcb34.firebaseapp.com",
    databaseURL: "https://pets-fcb34.firebaseio.com/",
    projectId: "pets-fcb34",
    storageBucket: "pets-fcb34.appspot.com",
    messagingSenderId: "18111954663"
};
var fbApp = firebase.initializeApp(config);

// global reference to remote database app
export const db = fbApp.database()
// global reference to remote storage
export const storageRef = fbApp.storage().ref()
// create useful endpoints within the database
export const petsRef = db.ref('pets')
export const ownersRef = db.ref('owners')
