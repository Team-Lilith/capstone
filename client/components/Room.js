import React, {useState, useEffect} from 'react'
import {initiateSocket, disconnectSocket} from '../socket'
import {useSelector, useDispatch} from 'react-redux'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import {useParams} from 'react-router'
import {joinRoom, fullRoom} from '../store/room.js'
import socket from '../socket'
import '../index.css'
import Effects from './Effects'

function Room() {
  const roomId = useSelector(state => state.room)
  const [canvas, setCanvas] = useState('')
  let {id} = useParams()
  const dispatch = useDispatch()

  const initCanvas = () =>
    // create new canvas
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })

  // if (canvas === '') {
  //   setCanvas(initCanvas())
  // }

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
    // initialize canvas to newly created canvas
    setCanvas(initCanvas())
  }, [])

  // console.log(canvas)
  // canvas.on('mouse:down', function(options) {
  //   if (options.target) {
  //     console.log('an object was clicked! ', options.target.type);
  //   }
  // });

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
      <Effects canvas={canvas} />
    </div>
  )
}

export default Room
