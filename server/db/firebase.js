import firebase from 'firebase'
import 'firebase/firestore'

var FIREBASE_CONFIG = require('./fbconfig.json')

// Your web app's Firebase configuration
if (process.env.NODE_ENV === 'development') {
  var firebaseConfig = FIREBASE_CONFIG
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

export {firebase, firestore}
