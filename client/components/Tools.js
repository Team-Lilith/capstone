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
    <div id="tools-inner">
      <div>
        <ChromePicker color={color} onChange={handleColorChange} />
      </div>

      <div id="tools-buttons">
        <div className="button-group">
          <div
            className="nav-button"
            onClick={() => toggleMode(modes.drawing, canvas, color)}
          >
            Draw
          </div>
          <div
            className="nav-button"
            onClick={() => toggleMode(modes.pan, canvas, color)}
          >
            Stop Drawing
          </div>
        </div>
        <div className="button-group">
          <div className="nav-button" onClick={() => addRect(canvas)}>
            Add Rectangle
          </div>
          <div className="nav-button" onClick={() => addCirc(canvas)}>
            Add Circle
          </div>
          <div className="nav-button" onClick={() => addTri(canvas)}>
            Add Triangle
          </div>
          <div className="nav-button" onClick={() => addText(canvas)}>
            Add Text
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>

        <div className="button-group">
          <div className="nav-button" onClick={() => deselect(canvas)}>
            Deselect
          </div>
          <div className="nav-button" onClick={() => deleteSelected(canvas)}>
            Delete Selected
          </div>
          <div className="nav-button" onClick={() => bringForward(canvas)}>
            Bring Forward
          </div>
          <div className="nav-button" onClick={() => sendBackwards(canvas)}>
            Send Backwards
          </div>
        </div>

        <div className="button-group">
          <div
            className="nav-button"
            onClick={() => groupObjects(canvas, group, true)}
          >
            Group
          </div>
          <div
            className="nav-button"
            onClick={() => groupObjects(canvas, group, false)}
          >
            Ungroup
          </div>
          <div
            className="nav-button"
            onClick={() => clearCanvas(canvas, svgState)}
          >
            Clear Canvas
          </div>
          <div
            className="nav-button"
            onClick={() => restoreCanvas(canvas, svgState)}
          >
            Restore Canvas
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tools
