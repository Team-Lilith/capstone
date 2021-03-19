import {fabric} from 'fabric'
import React from 'react'
import socket from '../socket'

function Images(props) {
  // ARRAY OF IMAGES
  const images = [
    'https://www.pngitem.com/pimgs/m/522-5222932_freetoedit-edit-emoji-png-freetoedit-emojis-sticker-transparent.png',
    'https://www.clipartmax.com/png/middle/44-443968_smiley-png-thumbs-up-emoji-png.png',
    'https://toppng.com/uploads/preview/adult-emojis-adult-emojis-115633556309phsvru9pf.png',
    'https://www.pngitem.com/pimgs/m/513-5131769_emoji-hot-png-transparent-png.png',
    'https://www.pinclipart.com/picdir/middle/167-1675358_a-real-apple-emoji-emoji-ios-11-png.png',
    '/images/pug.png',
    '/images/corgi.png',
    '/images/chih.png'
  ]

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

  return (
    <div className="App">
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
  )
}

export default Images
