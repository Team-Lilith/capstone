const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'
const CLEAR_ROOM = 'CLEAR_ROOM'

export const setCurrentRoom = roomId => ({type: SET_CURRENT_ROOM, roomId})
export const clearRoom = () => ({type: CLEAR_ROOM})

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
