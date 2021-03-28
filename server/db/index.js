// const {firebase, auth, provider, firestore, realtimeDB, signInWithGoogle} = require('./firebase')
var firebase = require('firebase/app')

// Add the Firebase products that you want to use
const auth = require('firebase/auth')
const firestore = require('firebase/firestore')
const realtimeDB = require('firebase/database')

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

console.log(auth)

firebase.default.initializeApp(firebaseConfig)

// const auth = firebase.auth()
const provider = new auth.default.GoogleAuthProvider()
// const firestore = firebase.firestore()
const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
}
// const realtimeDB = firebase.database()

module.exports = {
  firebase,
  auth,
  provider,
  firestore,
  realtimeDB,
  signInWithGoogle
}
