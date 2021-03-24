import React, {useState, useEffect} from 'react'
import {initiateSocket, disconnectSocket} from '../socket'
import {useSelector, useDispatch} from 'react-redux'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import {useParams} from 'react-router'
import {joinRoom, fullRoom} from '../store/room.js'
import {receiveFullRoom, receiveNoRoom, emitJoinRoom} from '../socket'
import '../index.css'
import Canvas from './Canvas'

function Room() {
  const roomId = useSelector(state => state.room)
  const [canvas, setCanvas] = useState('')
  let {id} = useParams()
  const dispatch = useDispatch()

  receiveFullRoom(dispatch)
  receiveNoRoom(dispatch)

  const initCanvas = () =>
    // create new canvas
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })

  if (!roomId) {
    dispatch(joinRoom(id))
    emitJoinRoom(id)
  }

  useEffect(() => {
    // initialize canvas to newly created canvas
    setCanvas(initCanvas())
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
      <Canvas canvas={canvas} />
    </div>
  )
}

export default Room
