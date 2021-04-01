import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGallery} from '../store'
import {fabric} from 'fabric'

function Gallery(props) {
  const dispatch = useDispatch()
  const gallery = useSelector(state => state.gallery)

  useEffect(
    () => {
      if (!gallery.length) {
        dispatch(fetchGallery())
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
          canv.hoverCursor = 'auto'
          canv.defaultCursor = 'pointer'
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
            <Link to={`/gallery/${el.id}`}>
              <div key={el.id}>
                <canvas id={el.id} className="gallery-element" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  ) : (
    'Nothing here.'
  )
}

export default Gallery
