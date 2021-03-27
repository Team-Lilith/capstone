import React, {useEffect} from 'react'
import {HuePicker} from 'react-color'
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
import Save from './Save'

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

  useEffect(
    () => {
      console.log('on the use effect')

      if (canvas) {
        // console.log('testing re render')
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
            id: options.target.id,
            room: roomId
          })
        })
      }
    },
    [canvas]
  )

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
      <div id="tools-buttons">
        <div className="button-group">
          <div id="hue-picker">
            <HuePicker color={color} onChange={handleColorChange} />
          </div>
          <div
            className="nav-button"
            onClick={() => toggleMode(modes.drawing, canvas, color)}
          >
            <h2>Draw</h2>
          </div>
          <div
            className="nav-button"
            onClick={() => toggleMode(modes.pan, canvas, color)}
          >
            <h2>Stop Drawing</h2>
          </div>
        </div>
        <div className="button-group">
          <div className="nav-button" onClick={() => addRect(canvas)}>
            <h2>Add Rectangle</h2>
          </div>
          <div className="nav-button" onClick={() => addCirc(canvas)}>
            <h2>Add Circle</h2>
          </div>
          <div className="nav-button" onClick={() => addTri(canvas)}>
            <h2>Add Triangle</h2>
          </div>
          <div className="nav-button" onClick={() => addText(canvas)}>
            <h2>Add Text</h2>
          </div>
          <input
            className="nav-button"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="button-group">
          <div className="nav-button" onClick={() => deselect(canvas)}>
            <h2>Deselect</h2>
          </div>
          <div className="nav-button" onClick={() => deleteSelected(canvas)}>
            <h2> Delete Selected</h2>
          </div>
          <div className="nav-button" onClick={() => bringForward(canvas)}>
            <h2> Bring Forward</h2>
          </div>
          <div className="nav-button" onClick={() => sendBackwards(canvas)}>
            <h2>Send Backwards</h2>
          </div>
        </div>

        <div className="button-group">
          <div
            className="nav-button"
            onClick={() => groupObjects(canvas, group, true)}
          >
            <h2>Group</h2>
          </div>
          <div
            className="nav-button"
            onClick={() => groupObjects(canvas, group, false)}
          >
            <h2>Ungroup</h2>
          </div>
          <div
            className="nav-button"
            onClick={() => clearCanvas(canvas, svgState)}
          >
            <h2>Clear Canvas</h2>
          </div>
          <div
            className="nav-button"
            onClick={() => restoreCanvas(canvas, svgState)}
          >
            <h2>Restore Canvas</h2>
          </div>
        </div>
        <div className="button-group">
          <div className="nav-button">
            <Save canvas={canvas} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tools
