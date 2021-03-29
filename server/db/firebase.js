import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

//var FIREBASE_CONFIG = require('./fbconfig.json')

const firebaseConfig = {
  apiKey: 'AIzaSyCpJMMeWhHixunuu6h_5BF7Xo7V6z1AnRI',
  authDomain: 'capstone-e6ea2.firebaseapp.com',
  databaseURL: 'https://capstone-e6ea2-default-rtdb.firebaseio.com',
  projectId: 'capstone-e6ea2',
  storageBucket: 'capstone-e6ea2.appspot.com',
  messagingSenderId: '133828787014',
  appId: '1:133828787014:web:ad8b29f5afdde84e074347'
}

// Your web app's Firebase configuration
// if (process.env.NODE_ENV === 'development') {
//   var firebaseConfig = FIREBASE_CONFIG
// }

// Initialize the default app
//let defaultApp = firebase.initializeApp(defaultAppConfig);

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
// Set authentication Provider to Google Auth
const provider = new firebase.auth.GoogleAuthProvider()
//Initialize Firebase
//firebase.initializeApp(defaultAppConfig)

const firestore = firebase.firestore()

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}

export {firebase, auth, provider, firestore}
