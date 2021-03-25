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
    <div id="join-outer">
      <div id="join">
        <h1>Rooms</h1>
        <div id="join-input">
          <input type="text" onChange={handleChange} />
        </div>

        <div id="join-buttons">
          <div className="nav-button" onClick={() => createRoom()}>
            Create a Room
          </div>

          <div className="nav-button" onClick={() => joinRoom()}>
            Join a Room
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join
