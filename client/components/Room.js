import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Tools, Images, Chat} from './index'
import {fabric} from 'fabric'
import {useParams} from 'react-router'
import {
  emitJoinRoom,
  receiveFullRoom,
  receiveNoRoom,
  joinSuccess,
  createSuccess
} from '../socket'
import '../index.css'
import Canvas from './Canvas'
import {getInitialCanvas, getInitialObjects} from '../store'

function Room() {
  const roomId = useSelector(state => state.room)
  const initialCanvas = useSelector(state => state.canvas)
  const initialObjects = useSelector(state => state.objects)
  const [canvas, setCanvas] = useState('')
  const dispatch = useDispatch()
  let {id} = useParams()
  joinSuccess(dispatch)
  createSuccess(dispatch)
  receiveFullRoom()
  receiveNoRoom()

  const initCanvas = () =>
    // create new canvas
    new fabric.Canvas('canvas', {
      height: 625,
      width: 625,
      backgroundColor: 'white',
      controlsAboveOverlay: true
    })

  useEffect(() => {
    // initialize canvas to newly created canvas
    setCanvas(initCanvas())
  }, [])

  useEffect(
    () => {
      if (!roomId) {
        emitJoinRoom(id)
      } else {
        // if we have a roomId, check if their is an existing canvas & objects in the DB
        dispatch(getInitialObjects(roomId))
        dispatch(getInitialCanvas(roomId))
      }
    },
    [roomId]
  )

  useEffect(
    () => {
      if (initialCanvas && canvas) {
        // if our thunk retrieved an existing canvas for this room, check if it has any objects
        let startingCanvas = initialCanvas
        if (startingCanvas.objects) {
          for (let i = 0; i < initialObjects.length; i++) {
            // update each object on the canvas with the matching id from our array of all obj ids
            startingCanvas.objects[i].id = initialObjects[i]
            startingCanvas.objects[i].emit = false
          }
        }
        // load canvas with objects
        canvas.loadFromJSON(startingCanvas)
      }
    },
    [initialCanvas]
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
