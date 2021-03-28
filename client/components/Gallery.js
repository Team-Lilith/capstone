import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchGallery} from '../store'
import {fabric} from 'fabric'

function Gallery(props) {
  const dispatch = useDispatch()
  const gallery = useSelector(state => state.gallery)

  useEffect(
    () => {
      if (!gallery.length) {
        dispatch(fetchGallery())
        console.log('fetching gallery')
      } else {
        for (let i = 0; i < gallery.length; i++) {
          let newCanvas = new fabric.Canvas(gallery[i].id)
          newCanvas.loadFromJSON(
            gallery[i].data.canvas,
            newCanvas.renderAll.bind(newCanvas),
            function(o, object) {
              object.set('selectable', false)
            }
          )
        }
      }
    },
    [gallery]
  )

  return gallery ? (
    <div className="gallery">
      <h1>Gallery</h1>
      <div>
        {gallery.map(el => {
          return (
            <canvas
              key={el.id}
              id={el.id}
              width="300px"
              height="200px"
              // className="gallery-element"
            />
          )
        })}
      </div>
    </div>
  ) : (
    'Nothing here.'
  )
}

export default Gallery
