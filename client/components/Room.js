import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import {useParams} from 'react-router'
import {
  emitJoinRoom,
  receiveFullRoom,
  receiveNoRoom,
  joinSuccess
} from '../socket'
import '../index.css'
import Canvas from './Canvas'

function Room() {
  const roomId = useSelector(state => state.room)
  const [canvas, setCanvas] = useState('')
  const dispatch = useDispatch()
  let {id} = useParams()
  joinSuccess(dispatch)
  receiveFullRoom()
  receiveNoRoom()

  // this could potentially be another util function
  const initCanvas = () => {
    // create new canvas
    new fabric.Canvas('canvas', {
      height: 625,
      width: 625,
      backgroundColor: 'white'
    })

  }

  useEffect(() => {
    // initialize canvas to newly created canvas
    setCanvas(initCanvas())
  }, [])

  useEffect(
    () => {
      if (!roomId) {
        emitJoinRoom(id)
      }
    },
    [roomId]
  )

  return (
    <div id="room">
      <div id="room-top-container">
        <div id="images">
          <Images canvas={canvas} />
        </div>

        <div id="canvas-div">
          <div id="tools">
            <Tools canvas={canvas} roomId={id} />
          </div>
          <canvas id="canvas" />
        </div>

        <div id="chat">
          <Chat roomId={roomId} />
        </div>
      </div>

      <Canvas canvas={canvas} />
    </div>
  )
}

export default Room
