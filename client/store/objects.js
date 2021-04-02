import {realtimeDB} from '../../server/db'

//action types
const SET_INITIAL_OBJECTS = 'SET_INITIAL_OBJECTS'

//action creators
const setInitialObjects = objects => ({
  type: SET_INITIAL_OBJECTS,
  objects
})

//thunks
export const getInitialObjects = roomId => dispatch => {
  let objIds = realtimeDB.ref(roomId).child('objectIds')
  objIds
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        dispatch(setInitialObjects(snapshot.val()))
      } else {
        console.log('')
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
    case SET_INITIAL_OBJECTS:
      return action.objects
    default:
      return state
  }
}
