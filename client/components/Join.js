import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {v1 as uuid} from 'uuid'
import {
  emitCreateRoom,
  emitJoinRoom,
  joinSuccess,
  receiveNoRoom,
  receiveFullRoom
} from '../socket'
import '../index.css'

function Join() {
  const [roomId, setRoomId] = useState('')
  const dispatch = useDispatch()
  joinSuccess(dispatch)
  receiveNoRoom()
  receiveFullRoom()

  function createRoom() {
    const id = roomId || uuid()
    emitCreateRoom(id)
  }

  const joinRoom = () => {
    emitJoinRoom(roomId)
  }

  const handleChange = e => {
    setRoomId(e.target.value)
  }

  return (
    <div>
      <h1>Join a Room</h1>
      <button type="button" onClick={() => createRoom()}>
        Create A Room
      </button>

      <input type="text" onChange={handleChange} />
      <button type="button" onClick={() => joinRoom()}>
        Join Room
      </button>
    </div>
  )
}

export default Join
