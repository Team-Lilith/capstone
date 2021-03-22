import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import socket from '../socket'
import {getImages} from '../store/images'
import {addImage} from './FabricUtils'

function Images(props) {
  const dispatch = useDispatch()
  const imgArr = useSelector(state => state.images)
  let canvas = props.canvas

  useEffect(() => {
    dispatch(getImages())
  }, [])

  // ADD IMAGE MOVED TO FABRICUTILS.JS

  // IMAGE EVENT LISTENERS

  // listen for the server to broadcast an add-image event, and call the addImage function
  socket.off('add-image')
  socket.on('add-image', image => {
    addImage(canvas, image, true)
  })

  return imgArr.length ? (
    <div className="Images">
      {imgArr.map(imageUrl => {
        return (
          <img
            src={imageUrl}
            onClick={() => addImage(canvas, imageUrl, false)}
            className="image-bar-image"
            key={imageUrl}
          />
        )
      })}
    </div>
  ) : (
    'no images'
  )
}

export default Images
