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
        let canvasSVG = object.canvas
        console.log(canvasSVG)
        return <div>{canvasSVG}</div>
      })}
    </div>
  ) : (
    'nothing to show'
  )
}

export default Gallery
