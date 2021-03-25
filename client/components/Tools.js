import React, {useEffect} from 'react'
import {ChromePicker} from 'react-color'
import {v1 as uuid} from 'uuid'
import socket, {emitModifiedCanvasObject, emitAddedToCanvas} from '../socket'
import {
  addRect,
  addCirc,
  addTri,
  addText,
  deselect,
  groupObjects,
  toggleMode,
  clearCanvas,
  restoreCanvas,
  setPanEvents,
  deleteSelected,
  bringForward,
  sendBackwards
} from './FabricUtils'

function Tools(props) {
  const canvas = props.canvas
  const roomId = props.roomId
  const group = {}
  const svgState = {}
  const modes = {
    pan: 'pan',
    drawing: 'drawing'
  }
  const [color, setColor] = React.useState('fff')

  // CANVAS EVENT LISTENER - OBJECT MODIFIED
  if (canvas) {
    canvas.on('object:modified', function(options) {
      if (options.target) {
        const objModified = {
          obj: options.target,
          id: options.target.id
        }
        emitModifiedCanvasObject(objModified)
      }
    })
    // this canvas event listens to objects moving
    // this is how we can see two objects move @ same time
    // id had to be changed bc comming undefined
    // ^dets in fabric utils file
    canvas.on('object:moving', function(options) {
      if (options.target) {
        const objModified = {
          obj: options.target,
          id: options.target.id
        }
        emitModifiedCanvasObject(objModified)
      }
    })
    canvas.on('object:added', function(options) {
      console.log(options)
      if (!options.target.id) options.target.id = uuid()
      console.log('id:', options.target.id)

      // same with images we are having a bool
      // to dictate to emit or not
      // if not it will be a ping pong event and
      // objects will be added more than 20 times
      // see socket file for more dets
      if (options.target.emit === false) return
      emitAddedToCanvas({
        obj: options.target,
        id: options.target.id
      })
    })
  }

  useEffect(
    () => {
      if (canvas) {
        setPanEvents(canvas)
      }
    },
    [setPanEvents, canvas]
  )

  const handleColorChange = color => {
    setColor(color.hex)
  }

  const handleImageUpload = event => {
    const reader = new FileReader()
    const imageToUpload = event.target.files[0]
    reader.readAsDataURL(imageToUpload)
    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, img => {
        img.scaleToHeight(300)
        canvas.add(img)
        canvas.requestRenderAll()
      })
    })
  }

  return (
    <div className="App">
      <button type="button" onClick={() => addRect(canvas, roomId)}>
        Rectangle
      </button>
      <button type="button" onClick={() => addCirc(canvas)}>
        Add Circle
      </button>
      <button type="button" onClick={() => addTri(canvas)}>
        Add Triangle
      </button>

      <button onClick={() => addText(canvas)}>Add Text</button>

      <button onClick={() => toggleMode(modes.drawing, canvas, color)}>
        Draw
      </button>

      <button onClick={() => toggleMode(modes.pan, canvas, color)}>Drag</button>

      <button type="button" onClick={() => deselect(canvas)}>
        Deselect
      </button>
      <button onClick={() => deleteSelected(canvas)}>Delete Selected</button>
      <button onClick={() => bringForward(canvas)}>Bring Forward</button>
      <button onClick={() => sendBackwards(canvas)}>Send Backwards</button>
      <button onClick={() => groupObjects(canvas, group, true)}>Group</button>
      <button onClick={() => groupObjects(canvas, group, false)}>
        Ungroup
      </button>

      <button onClick={() => clearCanvas(canvas, svgState)}>
        Clear Canvas
      </button>
      <button onClick={() => restoreCanvas(canvas, svgState)}>
        Restore Canvas
      </button>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <ChromePicker color={color} onChange={handleColorChange} />
    </div>
  )
}

export default Tools
