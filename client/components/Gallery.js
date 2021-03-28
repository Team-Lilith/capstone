import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchGallery} from '../store'
import {fabric} from 'fabric'

function Gallery(props) {
  const dispatch = useDispatch()
  const gallery = useSelector(state => state.gallery)
  //console.log()
  useEffect(
    () => {
      if (!gallery.length) {
        dispatch(fetchGallery())
        console.log('fetching gallery')
      } else {
        for (let i = 0; i < gallery.length; i++) {
          let newCanvas = new fabric.Canvas(gallery[i].id)

          let canv = newCanvas.loadFromJSON(
            gallery[i].data.canvas,
            newCanvas.renderAll.bind(newCanvas),
            function(o, object) {
              object.set('selectable', false)
            }
          )
          canv.setZoom(0.5)
          canv.setWidth(625 * canv.getZoom())
          canv.setHeight(625 * canv.getZoom())
        }
      }
    },
    [gallery]
  )

  return gallery ? (
    <div className="gallery">
      <h1>Gallery</h1>
      <div className="canvases-container">
        {gallery.map(el => {
          return (
            <div key={el.id}>
              <canvas
                id={el.id}
                // width="625px"
                // height="625px"
                className="gallery-element"
              />
            </div>
          )
        })}
      </div>
    </div>
  ) : (
    'Nothing here.'
  )
}

export default Gallery
