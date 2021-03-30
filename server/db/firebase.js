const firebase = require('firebase')
require('firebase/auth')
require('firebase/firestore')
require('firebase/database')

var FIREBASE_CONFIG = require('./fbconfig.json')

let firebaseConfig

if (process.env.NODE_ENV === 'development') {
  firebaseConfig = FIREBASE_CONFIG
} else {
  firebaseConfig = process.env.FIREBASE_CONFIG
}

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
