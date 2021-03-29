import firebase from 'firebase'
import {firestore} from '../../server/db'
import history from '../history'

//action types
const SET_GALLERY = 'GET_GALLERY'
const ADD_CANVAS = 'ADD_CANVAS'

//ACTION CREATORS
const setGallery = gallery => ({
  type: SET_GALLERY,
  gallery
})

//THUNKS
export const fetchGallery = () => async dispatch => {
  try {
    let gallery = []
    firestore
      .collection('gallery')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          gallery.push({
            data: doc.data(),
            id: doc.id
          })
          console.log(`${doc.id} => ${doc.data()}`)
        })
        console.log('got gallery')
        dispatch(setGallery(gallery))
      })
  } catch (error) {
    console.log('error fetching gallery', error)
  }
}

//SAVING CANVAS
export const saveCanvas = async (canvas, users = null) => {
  try {
    const canvasObj = canvas.toDatalessJSON()
    await firestore
      .collection('gallery')
      .add({
        canvas: canvasObj,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        users: users
      })
      .then(docRef => {
        console.log('Canvas written with ID: ', docRef.id)
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
    history.push('/gallery')
  } catch (error) {
    console.log('error saving canvas to db', error)
  }
}

export const saveToPng = canvas => {
  canvas.toBlob(function(blob) {
    saveAs(blob, 'myIMG.png')
  })
}

const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GALLERY:
      return action.gallery
    default:
      return state
  }
}
