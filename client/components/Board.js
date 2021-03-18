import {fabric} from 'fabric'
import React, {useState, useEffect} from 'react'
import Tools from './Tools'
import Images from './Images'
import io from 'socket.io-client'

function Board() {
  const [canvas, setCanvas] = useState('')

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: 'pink'
    })

  useEffect(() => {
    setCanvas(initCanvas())
  }, [])

  return (
    <div>
      {/* <button onClick={() => addRect(canvas)}>Rectangle</button> */}
      <Tools canvas={canvas} />
      <Images canvas={canvas} />
      <canvas id="canvas" />
    </div>
  )
}

export default Board
