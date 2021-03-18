import {fabric} from 'fabric'
import React, {useRef, useEffect} from 'react'
import io from 'socket.io-client'

function Images(props) {
  const socketRef = useRef()
  socketRef.current = io.connect('/')

  const images = [
    'https://www.pngitem.com/pimgs/m/522-5222932_freetoedit-edit-emoji-png-freetoedit-emojis-sticker-transparent.png',
    'https://www.clipartmax.com/png/middle/44-443968_smiley-png-thumbs-up-emoji-png.png',
    'https://toppng.com/uploads/preview/adult-emojis-adult-emojis-115633556309phsvru9pf.png',
    'https://www.pngitem.com/pimgs/m/513-5131769_emoji-hot-png-transparent-png.png',
    'https://www.pinclipart.com/picdir/middle/167-1675358_a-real-apple-emoji-emoji-ios-11-png.png'
  ]

  useEffect(() => {}, [])

  const addImage = (image, emit) => {
    let canvas = props.canvas
    if (!emit) {
      console.log('add image not emitted from socket')
      fabric.Image.fromURL(image, function(oImg) {
        oImg.scale(0.25)
        canvas.add(oImg)
        socketRef.current.emit('addImage', image)
      })
    } else {
      console.log('add image emitted from socket')
      fabric.Image.fromURL(image, function(oImg) {
        oImg.scale(0.25)
        canvas.add(oImg)
      })
    }
  }

  const onAddImageEvent = data => {
    addImage(data, true)
  }
  socketRef.current.on('addImage', onAddImageEvent)

  return (
    <div className="App">
      {images.map(imageUrl => {
        return (
          <img
            src={imageUrl}
            onClick={() => addImage(imageUrl, false)}
            width="100px"
          />
        )
      })}
    </div>
  )
}

export default Images
