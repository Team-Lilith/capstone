import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {v1 as uuid} from 'uuid'
import {
  emitCreateRoom,
  emitJoinRoom,
  joinSuccess,
  createSuccess,
  receiveNoRoom,
  receiveFullRoom
} from '../socket'
import '../index.css'

function Join() {
  const [roomId, setRoomId] = useState('')
  const dispatch = useDispatch()
  joinSuccess(dispatch)
  createSuccess(dispatch)
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
        <h1>Create</h1>
        <div id="join-input">
          <input
            type="text"
            placeholder="Enter a room name..."
            onChange={handleChange}
          />
        </div>

        <div id="join-buttons">
          <div className="nav-button" onClick={() => createRoom()}>
            <h3>Start a New Room</h3>
          </div>

          <div className="nav-button" onClick={() => joinRoom()}>
            <h3>Join an Existing Room</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join
