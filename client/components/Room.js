import React, {useState, useEffect} from 'react'
import {initiateSocket, disconnectSocket} from '../socket'
import {useSelector, useDispatch} from 'react-redux'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import {useParams} from 'react-router'
import {joinRoom, fullRoom} from '../store/room.js'
import socket from '../socket'
import '../index.css'

function Room() {
  const roomId = useSelector(state => state.room)
  const [canvas, setCanvas] = useState('')
  let {id} = useParams()
  const dispatch = useDispatch()

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })

  socket.on('full room', () => {
    // notification here(?)
    dispatch(fullRoom())
  })

  socket.on('no room', () => {
    // notification here(?)
    dispatch(fullRoom())
  })

  if (!roomId) {
    dispatch(joinRoom(id))
    socket.emit('join room', id)
  }

  useEffect(() => {
    setCanvas(initCanvas())
    // if (roomId) initiateSocket(roomId);
  }, [])

  return (
    <div id="room">
      <div id="room-top-container">
        <div id="images">
          <Images canvas={canvas} />
        </div>
        <div id="canvas-div">
          <canvas id="canvas" />
        </div>

        <div id="chat">
          <Chat roomId={roomId} />
        </div>
      </div>

      <div id="tools">
        <Tools canvas={canvas} />
      </div>
    </div>
  )
}

export default Room
