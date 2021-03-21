import axios from 'axios'
import history from '../history'

const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'
export const currentRoom = roomId => ({type: SET_CURRENT_ROOM, roomId})

export const joinRoom = roomId => dispatch => {
  dispatch(currentRoom(roomId))
  history.push(`/room/${roomId}`)
}

let initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM:
      return action.roomId
    default:
      return state
  }
}
