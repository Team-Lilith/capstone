import React from 'react'
import socket from '../socket'
import {addRect, addCirc, addTri, deselect} from './FabricUtils'

function Tools(props) {
  const canvas = props.canvas

  // TOOL FUNCTIONS MOVED TO FABRICUTILS.JS

  // CANVAS EVENT LISTENER - OBJECT MODIFIED
  if (canvas) {
    canvas.on('object:modified', function(options) {
      if (options.target) {
        console.log('an object was modified! ', options.target)
        socket.emit('object-modified', {
          obj: options.target,
          id: options.target.id
        })
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
