import {realtimeDB} from '../../server/db'

//action types
const SET_INITIAL_CANVAS = 'SET_INITIAL_CANVAS'

//action creators
const setInitialCanvas = canvas => ({
  type: SET_INITIAL_CANVAS,
  canvas
})

//thunks
export const getInitialCanvas = roomId => dispatch => {
  let canvas = realtimeDB.ref(roomId).child('canvas')
  canvas
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        dispatch(setInitialCanvas(snapshot.val()))
      } else {
        console.log('Canvas not found.')
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

const initialState = ''

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_CANVAS:
      return action.canvas
    default:
      return state
  }
}
