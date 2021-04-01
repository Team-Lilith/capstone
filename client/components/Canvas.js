import React from 'react'
import {useSelector} from 'react-redux'
import {
  modifyCanvasObject,
  receiveImage,
  receiveAddedObject,
  receiveRemovedObject,
  modifyIndex
} from '../socket'
import {addImage} from './FabricUtils'

function Canvas(props) {
  const canvas = props.canvas
  const roomId = useSelector(state => state.room)

  if (canvas) {
    modifyCanvasObject(canvas)
    receiveImage(addImage, canvas, roomId)
    receiveAddedObject(canvas)
    receiveRemovedObject(canvas)
    modifyIndex(canvas)
  }

  return <></>
}

export default Canvas
