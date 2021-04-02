import React, {useState, useEffect, useRef} from 'react'
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
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SaveForm from './SaveForm'

function Room() {
  const canvasRef = useRef(null)
  const roomId = useSelector(state => state.room)
  const initialCanvas = useSelector(state => state.canvas)
  const initialObjects = useSelector(state => state.objects)
  const users = useSelector(state => state.user)
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
            let currentObj = startingCanvas.objects[i]
            // update each object on the canvas with the matching id from our array of all obj ids
            currentObj.id = initialObjects[i]
            currentObj.emit = false
            if (currentObj.type === 'path') {
              currentObj.fill = null
              currentObj.fillRule = null
            }
          }
        }
        // load canvas with objects
        canvas.loadFromJSON(startingCanvas)
      }
    },
    [initialCanvas]
  )

  useEffect(
    () => {
      if (canvasRef.current && canvas) {
        const canvasElement = canvasRef.current
        canvasElement.addEventListener(
          'drop',
          e => {
            const imgBeingDragged = document.getElementsByClassName(
              'image-being-dragged'
            )[0]
            const newImage = new fabric.Image(imgBeingDragged, {
              left: e.X - 50,
              top: e.Y - 50
            })
            newImage.scale(0.25)
            canvas.add(newImage)
          },
          false
        )
      }
    },
    [canvasRef, canvas]
  )

  return (
    <div id="room">
      <div id="room-top-container">
        <div id="images">
          <Images canvas={canvas} />
        </div>

        <div id="canvas-div" ref={canvasRef}>
          <div id="tools">
            <Tools
              canvas={canvas}
              roomId={id}
              toggleSaveForm={toggleSaveForm}
            />
          </div>
          <canvas id="canvas" />
        </div>

        <div id="chat">
          <Chat roomId={roomId} />
        </div>
      </div>

      <Canvas canvas={canvas} />
      <ToastContainer />
      <div
        id="save-component"
        className="toggle-save hidden"
        style={{display: 'none'}}
      >
        <SaveForm canvas={canvas} toggleSaveForm={toggleSaveForm} />
      </div>
    </div>
  )
}

function toggleSaveForm() {
  var saveForm = document.getElementById('save-component')
  console.log(saveForm)
  if (saveForm.style.display === 'none') {
    saveForm.style.display = 'block'
  } else {
    saveForm.style.display = 'none'
  }
}

export default Room
