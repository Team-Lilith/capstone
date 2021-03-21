import axios from 'axios'
import history from '../history'

const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'
const CLEAR_ROOM = 'CLEAR_ROOM'

export const currentRoom = roomId => ({type: SET_CURRENT_ROOM, roomId})
export const clearRoom = () => ({type: CLEAR_ROOM})

export const joinRoom = roomId => dispatch => {
  dispatch(currentRoom(roomId))
  history.push(`/room/${roomId}`)
}

export const fullRoom = () => dispatch => {
  dispatch(clearRoom())
  history.push('/')
}

let initialState = ''

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ROOM:
      return action.roomId
    case CLEAR_ROOM:
      return ''
    default:
      return state
  }
}
