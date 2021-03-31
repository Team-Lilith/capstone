import {firestore, storage} from '../../server/db'
import firebase from 'firebase'

//action types
const GOT_IMAGES = 'GOT_IMAGES'

//action creators
const gotImages = images => ({
  type: GOT_IMAGES,
  images
})

//thunks
export const getImages = () => async dispatch => {
  try {
    let images = []
    var storageRef = firebase.storage().ref()

    await storageRef
      .listAll()
      .then(res => {
        res.items.forEach(async ref => {
          let imgurl = await ref.getDownloadURL()

          console.log('url', imgurl)
          images.push({url: imgurl})
        })
      })
      .catch(err => {
        console.log(err)
      })

    dispatch(gotImages(images))
  } catch (error) {
    console.error(error)
  }
}

const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_IMAGES:
      return action.images
    default:
      return state
  }
}
