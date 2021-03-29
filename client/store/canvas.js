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
  console.log('in get initial canvas thunk')
  let canvas = realtimeDB.ref(roomId).child('canvas')

  canvas
    .get()
    .then(function(snapshot) {
      console.log(snapshot)
      if (snapshot.exists()) {
        console.log('snapshot in chat thunk =>', snapshot.val())
        dispatch(setInitialCanvas(snapshot.val()))
      } else {
        console.log('canvas not found')
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
