import firebase from 'firebase'
import {firestore} from '../../server/db'
import history from '../history'
import {saveAs} from 'file-saver'

//action types
const SET_GALLERY = 'GET_GALLERY'
const ADD_CANVAS = 'ADD_CANVAS'
const SET_SINGLE_GALLERY = 'SET_SINGLE_GALLERY'

//ACTION CREATORS
const setGallery = gallery => ({
  type: SET_GALLERY,
  gallery
})

const setSingleGallery = singleCanvas => ({
  type: SET_SINGLE_GALLERY,
  singleCanvas
})

//THUNKS
export const fetchGallery = () => async dispatch => {
  try {
    let gallery = []
    firestore
      // .collection('gallery')
      .collection('new-gallery')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          gallery.push({
            data: doc.data(),
            id: doc.id
          })
        })
        dispatch(setGallery(gallery))
      })
  } catch (error) {
    console.log('Error fetching gallery', error)
  }
}

export const fetchSingleCanvas = canvasId => async dispatch => {
  try {
    let singleCanvas = []
    firestore
      .collection('new-gallery')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id === canvasId) {
            singleCanvas.push({data: doc.data(), id: doc.id})
          }
        })
        dispatch(setSingleGallery(singleCanvas))
      })
  } catch (error) {
    console.log('Error fetching canvas', error)
  }
}

//SAVING CANVAS
export const saveCanvas = (canvas, title, artists = null) => {
  try {
    const canvasObj = JSON.stringify(canvas.toDatalessJSON())
    // const canvasObj = canvas.toDatalessJSON()
    firestore
      // .collection('gallery')
      .collection('new-gallery')
      .add({
        canvas: canvasObj,
        title: title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        artists: artists
      })
      .then(docRef => {
        //Canvas written with ID: docRef.id
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
    history.push('/gallery')
  } catch (error) {
    console.log('Error saving canvas to db', error)
  }
}

export const saveToPng = canvas => {
  canvas.toBlob(function(blob) {
    saveAs(blob, 'myCollaballage.png')
  })
}

const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GALLERY:
      return action.gallery
    case SET_SINGLE_GALLERY:
      return action.singleCanvas
    default:
      return state
  }
}
