const firebase = require('firebase')
require('firebase/auth')
require('firebase/firestore')
require('firebase/database')

// var FIREBASE_CONFIG = require('./fbconfig.json')

let firebaseConfig = {
  apiKey: 'AIzaSyCpJMMeWhHixunuu6h_5BF7Xo7V6z1AnRI',
  authDomain: 'capstone-e6ea2.firebaseapp.com',
  databaseURL: 'https://capstone-e6ea2-default-rtdb.firebaseio.com',
  projectId: 'capstone-e6ea2',
  storageBucket: 'capstone-e6ea2.appspot.com',
  messagingSenderId: '133828787014',
  appId: '1:133828787014:web:ad8b29f5afdde84e074347'
}

// if (process.env.NODE_ENV === 'development') {
//   firebaseConfig = FIREBASE_CONFIG
// } else {
//   firebaseConfig = process.env.FIREBASE_CONFIG
// }

// Your web app's Firebase configuration
// if (process.env.NODE_ENV === 'development') {
//   var firebaseConfig = FIREBASE_CONFIG
// }

firebase.default.initializeApp(firebaseConfig)

// const provider = new firebase.default.auth.GoogleAuthProvider()

// const signInWithGoogle = () => {
//   firebase.default.auth.signInWithPopup(provider)
// }

const auth = firebase.default.auth()
const firestore = firebase.default.firestore()
const google = new firebase.default.auth.GoogleAuthProvider()
const realtimeDB = firebase.default.database()

module.exports = {
  firebase,
  auth,
  google,
  firestore,
  realtimeDB
  // provider,
  // signInWithGoogle
}
