import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

var FIREBASE_CONFIG = require('./fbconfig.json')

if (process.env.NODE_ENV === 'development') {
  var firebaseConfig = FIREBASE_CONFIG
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

// Set authentication Provider to Google Auth
export const google = new firebase.auth.GoogleAuthProvider()

const firestore = firebase.firestore()

export {firebase, auth, firestore}
