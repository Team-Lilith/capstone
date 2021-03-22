import {fabric} from 'fabric'
import React from 'react'

function Tools(props) {
  // maybe abstract these function to a different file
  const addRect = canvas => {
    const rect = new fabric.Rect({
      height: 100,
      width: 500,
      fill: 'black'
    })
    canvas.add(rect)
    canvas.renderAll()
  }

  const addCirc = canvas => {
    const circle = new fabric.Circle({
      radius: 100,
      fill: 'lightblue'
    })
    canvas.add(circle)
    canvas.renderAll()
  }

  const addTri = canvas => {
    const triangle = new fabric.Triangle({
      width: 80,
      height: 100,
      fill: 'mistyrose'
    })
    canvas.add(triangle)
    canvas.renderAll()
  }

  const deselect = canvas => {
    canvas.discardActiveObject()
    canvas.requestRenderAll()
  }

  // can this be a map function?
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
