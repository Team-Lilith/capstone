import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {fetchSingleCanvas} from '../store'
import {fabric} from 'fabric'

function SingleCanvas(props) {
  const dispatch = useDispatch()
  let {id} = useParams()
  const singleCanvas = useSelector(state => state.singleCanvas)
  const [date, setDate] = useState('')

  useEffect(
    () => {
      if (!singleCanvas.length) {
        dispatch(fetchSingleCanvas(id))
      } else {
        for (let i = 0; i < singleCanvas.length; i++) {
          let canvas = new fabric.Canvas(singleCanvas[i].id)

          let newCanvas = canvas.loadFromJSON(
            singleCanvas[i].data.canvas,
            canvas.renderAll.bind(canvas),
            function(o, object) {
              object.set('selectable', false)
            }
          )
          newCanvas.hoverCursor = 'auto'
          newCanvas.defaultCursor = 'pointer'
          newCanvas.setZoom(0.5)
          newCanvas.setWidth(625 * newCanvas.getZoom())
          newCanvas.setHeight(625 * newCanvas.getZoom())

          console.log(
            'Option one',
            new Date(
              singleCanvas[0].data.timestamp.seconds * 1000
            ).toLocaleDateString()
          )
          console.log(
            'Option two',
            new Date(
              singleCanvas[0].data.timestamp.seconds * 1000
            ).toDateString()
          )
          setDate(
            new Date(
              singleCanvas[0].data.timestamp.seconds * 1000
            ).toLocaleDateString()
          )
        }
      }
    },
    [singleCanvas]
  )

  return singleCanvas ? (
    <div className="single-canvas-outter-container">
      <h1>Work of Art</h1>
      <div className="single-canvas-container">
        <div className="canvas-frame">
          <canvas className="canvas-frame" id={id} />
          <div>created on {date}</div>
        </div>
      </div>
    </div>
  ) : (
    'Loading...'
  )
}

export default SingleCanvas
