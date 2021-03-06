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
  const [title, setTitle] = useState('')

  useEffect(
    () => {
      if (!gallery.length) {
        dispatch(fetchGallery())
      } else {
        let singleCanvas = gallery.filter(canvas => canvas.id === id)
        console.log(singleCanvas)
        let canvas = new fabric.Canvas(singleCanvas[0].id)

        let newCanvas = canvas.loadFromJSON(
          singleCanvas[0].data.canvas,
          canvas.renderAll.bind(canvas),
          function(o, object) {
            object.set('selectable', false)
          }
        )
        newCanvas.hoverCursor = 'auto'
        newCanvas.defaultCursor = 'pointer'
        newCanvas.setZoom(0.9)
        newCanvas.setWidth(625 * newCanvas.getZoom())
        newCanvas.setHeight(625 * newCanvas.getZoom())

        setTitle(singleCanvas[0].data.title)
        setUsers(singleCanvas[0].data.artists)
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
      <h1>{title}</h1>
      <div className="single-canvas-container">
        <div className="canvas-frame">
          <canvas className="canvas-frame" id={id} />
        </div>
      </div>
      <div className="single-canvas-text">
        <div>Created on: {date}</div>
        <div>By: Anon</div>
      </div>
    </div>
  ) : (
    <div className="single-canvas-outter-container">
      <h1>{title}</h1>
      <div className="single-canvas-container">
        <div className="canvas-frame">
          <canvas className="canvas-frame" id={id} />
        </div>
      </div>
      <div className="single-canvas-text">
        <div>Created on: {date}</div>
        <div>By: {users.length > 1 ? users.join(' and ') : users}</div>
      </div>
    </div>
  )
}

export default SingleCanvas
