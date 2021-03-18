import {fabric} from 'fabric'
import React from 'react'

function Tools(props) {
  const addRect = canvas => {
    const rect = new fabric.Rect({
      height: 100,
      width: 500,
      fill: 'black'
    })
    canvas.add(rect)
    canvas.renderAll()
  }

  return (
    <div className="App">
      <button onClick={() => addRect(props.canvas)}>Rectangle</button>
    </div>
  )
}

export default Tools
