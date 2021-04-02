import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {fetchGallery} from '../store'
import {fabric} from 'fabric'

function SingleCanvas(props) {
  const dispatch = useDispatch()
  let {id} = useParams()
  const gallery = useSelector(state => state.gallery)
  const [date, setDate] = useState('')
  const [users, setUsers] = useState([])

  useEffect(
    () => {
      if (!gallery.length) {
        dispatch(fetchGallery())
      } else {
        let singleCanvas = gallery.filter(canvas => canvas.id === id)
        console.log(singleCanvas, 'single canvas')

        // for (let i = 0; i < gallery.length; i++) {
        //   let canvas = new fabric.Canvas(singleCanvas[i].id)

        //   let newCanvas = canvas.loadFromJSON(
        //     singleCanvas[i].data.canvas,
        //     canvas.renderAll.bind(canvas),
        //     function(o, object) {
        //       object.set('selectable', false)
        //     }
        //   )
        //   newCanvas.hoverCursor = 'auto'
        //   newCanvas.defaultCursor = 'pointer'
        //   newCanvas.setZoom(0.5)
        //   newCanvas.setWidth(625 * newCanvas.getZoom())
        //   newCanvas.setHeight(625 * newCanvas.getZoom())

        setUsers(singleCanvas[0].data.users)
        setDate(
          new Date(
            singleCanvas[0].data.timestamp.seconds * 1000
          ).toLocaleDateString()
        )
      }
    },
    [gallery]
  )

  return users === null ? (
    <div className="single-canvas-outter-container">
      <h1>Title</h1>
      <div className="single-canvas-container">
        <div className="canvas-frame">
          <canvas className="canvas-frame" id={id} />
          <div>Created on: {date}</div>
          <div>By: Anon</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="single-canvas-outter-container">
      <h1>Title</h1>
      <div className="single-canvas-container">
        <div className="canvas-frame">
          <canvas className="canvas-frame" id={id} />
          <div>Created on: {date}</div>
          <div>By: {users}</div>
        </div>
      </div>
    </div>
  )
}

export default SingleCanvas
