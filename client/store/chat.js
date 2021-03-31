import {realtimeDB} from '../../server/db'

//action types
const SET_INITIAL_CHAT = 'SET_INITIAL_CHAT'

//action creators
const setInitialChat = messages => ({
  type: SET_INITIAL_CHAT,
  messages
})

//thunks
export const getInitialChat = roomId => dispatch => {
  let messages = realtimeDB.ref(roomId).child('messages')

  messages
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        dispatch(setInitialChat(snapshot.val()))
      } else {
        dispatch(setInitialChat([]))
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INITIAL_CHAT:
      return action.messages
    default:
      return state
  }
}
