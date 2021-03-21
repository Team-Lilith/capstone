import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {initiateSocket, disconnectSocket} from '../socket'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import {joinRoom} from '../store/room.js'
import {v1 as uuid} from 'uuid'
import socket from '../socket'
import '../index.css'

function Join(props) {
  const [roomId, setRoomId] = useState('')
  const dispatch = useDispatch()

  function create() {
    const roomId = uuid()
    dispatch(joinRoom(roomId))
    socket.emit('create room', roomId)
  }

  const handleChange = e => {
    setRoomId(e.target.value)
  }

  const joinNewRoom = roomId => {
    dispatch(joinRoom(roomId))
    socket.emit('join room', roomId)
  }

  return (
    <div>
      <h1>Join a Room</h1>
      <button type="button" onClick={create}>
        Create A Room
      </button>

      <input type="text" onChange={handleChange} />
      <button type="button" onClick={() => joinNewRoom(roomId)}>
        Join Room
      </button>
    </div>
  )
}

export default Join
