import {fabric} from 'fabric'
import {connect} from 'puppeteer'
import React, {useState, useEffect, useDispatch} from 'react'
import {useSelector} from 'react-redux'
import socket from '../socket'
import {getImages} from '../store/images'

function Images(props) {
  const [images, setImages] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('setting images in effect hook')
    let images = dispatch(getImages())
    setImages(images)
  }, [])
  // IMAGE FUNCTIONS

  const addImage = (image, emit = false) => {
    let canvas = props.canvas
    fabric.Image.fromURL(image, function(oImg) {
      oImg.scale(0.25)
      canvas.add(oImg)
      if (!emit) {
        // if this function is being called because the server broadcast an add-image event, don't emit it again
        socket.emit('add-image', image)
      }
    })
  }

  // IMAGE EVENT LISTENERS

  // listen for the server to broadcast an add-image event, and call the addImage function
  socket.on('add-image', image => addImage(image, true))

  return images.length ? (
    <div className="Images">
      {images.map(imageUrl => {
        return (
          <img
            src={imageUrl}
            onClick={() => addImage(imageUrl, false)}
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

const mapImages = state => {
  return {
    images: state.images
  }
}

export default connect(mapImages)(Images)
