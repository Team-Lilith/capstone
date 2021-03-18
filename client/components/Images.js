import {fabric} from 'fabric'
import React from 'react'

function Images(props) {
  const images = [
    'https://www.pngitem.com/pimgs/m/522-5222932_freetoedit-edit-emoji-png-freetoedit-emojis-sticker-transparent.png',
    'https://www.clipartmax.com/png/middle/44-443968_smiley-png-thumbs-up-emoji-png.png',
    'https://toppng.com/uploads/preview/adult-emojis-adult-emojis-115633556309phsvru9pf.png',
    'https://www.pngitem.com/pimgs/m/513-5131769_emoji-hot-png-transparent-png.png',
    'https://www.pinclipart.com/picdir/middle/167-1675358_a-real-apple-emoji-emoji-ios-11-png.png'
  ]

  const addImage = (canvas, imageUrl) => {
    fabric.Image.fromURL(imageUrl, function(oImg) {
      oImg.scale(0.25)
      canvas.add(oImg)
    })
  }

  return (
    <div className="App">
      {images.map(image => {
        return (
          <img
            src={image}
            onClick={() => addImage(props.canvas, image)}
            width="100px"
          />
        )
      })}
    </div>
  )
}

export default Images
