import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchGallery} from '../store'
import firestore from '../../server/db'
import {object} from 'prop-types'

function Gallery(props) {
  const dispatch = useDispatch()
  const gallery = useSelector(state => state.gallery)
  const [localGallery, setGallery] = useState([])

  useEffect(
    () => {
      if (!gallery.length) {
        dispatch(fetchGallery())
        console.log('fetching gallery')
      } else {
        console.log('got gallery')
        setGallery(gallery)
      }
    },
    [gallery]
  )
  return localGallery ? (
    <div className="gallery">
      {localGallery.map(object => {
        let kanvas = object.data.canvas
        var timestamp = object.data.timestamp
        var date = timestamp.toDate()
        console.log(date)

        console.log(kanvas, 'kanvas')
        var canvas = new fabric.Canvas(object.id)
        canvas.loadFromJSON(kanvas, canvas.renderAll.bind(canvas), function(
          o,
          object
        ) {
          object.set('selectable', false)
        })
        return (
          <div key={object.id} className="gallery-element">
            <p>
              {'Date: ' +
                (date.getMonth() + 1) +
                '.' +
                date.getDate() +
                '.' +
                date.getFullYear()}
            </p>
            <canvas id={object.id} />
          </div>
        )
      })}
    </div>
  ) : (
    'nothing to show'
  )
}

export default Gallery
