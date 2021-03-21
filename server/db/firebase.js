import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCpJMMeWhHixunuu6h_5BF7Xo7V6z1AnRI',
  authDomain: 'capstone-e6ea2.firebaseapp.com',
  databaseURL: 'https://capstone-e6ea2-default-rtdb.firebaseio.com',
  projectId: 'capstone-e6ea2',
  storageBucket: 'capstone-e6ea2.appspot.com',
  messagingSenderId: '133828787014',
  appId: '1:133828787014:web:ad8b29f5afdde84e074347'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const firestore = firebase.firestore()

export default firestore
