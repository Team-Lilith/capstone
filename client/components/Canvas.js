import React from 'react'
import {modifyCanvasObject, receiveImage} from '../socket'
import {fabric} from 'fabric'
import {addImage, setCanvasBackground} from './FabricUtils'

function Canvas(props) {
  const canvas = props.canvas
  let image

  if (canvas) {
    modifyCanvasObject(canvas)
    receiveImage(addImage, canvas)
    // setCanvasBackground(image, canvas)
  }

  return <></>
}

export default Canvas
