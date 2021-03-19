import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {initiateSocket, disconnectSocket} from '../socket'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import '../index.css'

function Join(props) {
  const [roomId, setRoomId] = useState('')

  const handleChange = e => {
    setRoomId(e.target.value)
  }

  return (
    <div>
      <h1>Join a Room</h1>
      <button type="button">Create A Room</button>

      <input type="text" onChange={handleChange} />
      <Link to={`/room/${roomId}`}>
        <button type="button">Join Room</button>
      </Link>
    </div>
  )
}

export default Join
