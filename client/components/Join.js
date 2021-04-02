import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {v1 as uuid} from 'uuid'
import {
  emitCreateRoom,
  emitJoinRoom,
  emitRejoinRoom,
  joinSuccess,
  createSuccess,
  receiveNoRoom,
  receiveFullRoom,
  receiveExistingRoom
} from '../socket'
import '../index.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {showToast} from '../toasty'
import {Instructions} from './index'

function Join() {
  const [roomId, setRoomId] = useState('')
  const dispatch = useDispatch()
  joinSuccess(dispatch)
  createSuccess(dispatch)
  receiveNoRoom()
  receiveFullRoom()
  receiveExistingRoom()

  function createRoom() {
    const id = roomId || uuid()
    showToast()
    emitCreateRoom(id)
  }

  const joinRoom = () => {
    showToast()
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
          <ToastContainer />
        </div>
      </div>

      <Instructions />
    </div>
  )
}

export default Join
