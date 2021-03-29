const firebase = require('firebase')
require('firebase/auth')
require('firebase/firestore')
require('firebase/database')

var FIREBASE_CONFIG = require('./fbconfig.json')

if (process.env.NODE_ENV === 'development') {
  var firebaseConfig = FIREBASE_CONFIG
}

// Your web app's Firebase configuration
// if (process.env.NODE_ENV === 'development') {
//   var firebaseConfig = FIREBASE_CONFIG
// }

firebase.default.initializeApp(firebaseConfig)

const auth = firebase.default.auth()
const provider = new firebase.default.auth.GoogleAuthProvider()
const firestore = firebase.default.firestore()
const signInWithGoogle = () => {
  firebase.default.auth.signInWithPopup(provider)
}
const realtimeDB = firebase.default.database()

module.exports = {
  firebase,
  auth,
  provider,
  firestore,
  realtimeDB,
  signInWithGoogle
}
