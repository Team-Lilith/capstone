import React from 'react'
import {emitModifiedCanvasObject} from '../socket'
import {addRect, addCirc, addTri, deselect} from './FabricUtils'

function Tools(props) {
  const canvas = props.canvas

  // TOOL FUNCTIONS MOVED TO FABRICUTILS.JS

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

  return (
    <div className="App">
      <button type="button" onClick={() => addRect(props.canvas)}>
        Rectangle
      </button>
      <button type="button" onClick={() => addCirc(props.canvas)}>
        Add Circle
      </button>
      <button type="button" onClick={() => addTri(props.canvas)}>
        Add Triangle
      </button>
      <button type="button" onClick={() => deselect(props.canvas)}>
        Deselect
      </button>
    </div>
  )
}

export default Tools
