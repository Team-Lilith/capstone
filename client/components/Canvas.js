import React from 'react'
import {useSelector} from 'react-redux'
import {
  modifyCanvasObject,
  receiveImage,
  receiveAddedObject,
  receiveRemovedObject
} from '../socket'
import {fabric} from 'fabric'
import {addImage, setCanvasBackground} from './FabricUtils'

function Canvas(props) {
  const canvas = props.canvas
  const roomId = useSelector(state => state.room)
  let image

  if (canvas) {
    modifyCanvasObject(canvas)
    receiveImage(addImage, canvas, roomId)
    receiveAddedObject(canvas)
    receiveRemovedObject(canvas)
    // setCanvasBackground(image, canvas)
  }

  return <></>
}

export default Canvas
