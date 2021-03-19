import React, {useState, useEffect} from 'react'
import {initiateSocket, disconnectSocket} from '../socket'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import '../index.css'
import {useParams} from 'react-router-dom'

function Room() {
  let roomId = 1
  const [canvas, setCanvas] = useState('')

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })

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
