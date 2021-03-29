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
  console.log('in chat thunk')
  let messages = realtimeDB.ref(roomId).child('messages')

  messages
    .get()
    .then(function(snapshot) {
      console.log(snapshot)
      if (snapshot.exists()) {
        console.log('snapshot in chat thunk =>', snapshot.val())
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
