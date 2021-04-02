import {firestore} from '../../server/db'

const SET_SINGLE_GALLERY = 'SET_SINGLE_GALLERY'

const setSingleGallery = singleCanvas => ({
  type: SET_SINGLE_GALLERY,
  singleCanvas
})

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

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_GALLERY:
      return action.singleCanvas
    default:
      return state
  }
}
