const firebase = require('firebase')
require('firebase/auth')
require('firebase/firestore')
require('firebase/database')

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
