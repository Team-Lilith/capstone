import React, {useEffect} from 'react'
import {ChromePicker} from 'react-color'
import {emitModifiedCanvasObject} from '../socket'
import {
  addRect,
  addCirc,
  addTri,
  deselect,
  groupObjects,
  toggleMode,
  clearCanvas,
  restoreCanvas,
  setPanEvents
} from './FabricUtils'

function Tools(props) {
  const canvas = props.canvas
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
      <button type="button" onClick={() => addRect(canvas)}>
        Rectangle
      </button>
      <button type="button" onClick={() => addCirc(canvas)}>
        Add Circle
      </button>
      <button type="button" onClick={() => addTri(canvas)}>
        Add Triangle
      </button>

      <button onClick={() => toggleMode(modes.drawing, canvas, color)}>
        Draw
      </button>

      <button onClick={() => toggleMode(modes.pan, canvas, color)}>Drag</button>

      <button type="button" onClick={() => deselect(canvas)}>
        Deselect
      </button>
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
