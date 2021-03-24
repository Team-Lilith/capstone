import React from 'react'
import {modifyCanvasObject, receiveImage} from '../socket'
import {fabric} from 'fabric'
import {addImage} from './FabricUtils'

function Canvas(props) {
  const canvas = props.canvas

  if (canvas) {
    modifyCanvasObject(canvas)
    receiveImage(addImage, canvas)
  }

  return <></>
}

export default Canvas
