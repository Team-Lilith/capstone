import React from 'react'
import {modifyCanvasObject, receiveImage} from '../socket'
import {fabric} from 'fabric'
import {addImage, setCanvasBackground} from './FabricUtils'

function Canvas(props) {
  const canvas = props.canvas
  let image =
    'https://ctl.s6img.com/society6/img/Cf95RKFdxsaz1o2YTpdEPM_ZkFM/w_700/canvas/~artwork/s6-0009/a/2099891_14762463/~~/white-stf-canvas.jpg'

  if (canvas) {
    modifyCanvasObject(canvas)
    receiveImage(addImage, canvas)
    setCanvasBackground(image, canvas)
  }

  return <></>
}

export default Canvas
