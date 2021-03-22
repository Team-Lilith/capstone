import {fabric} from 'fabric'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import socket from '../socket'
import {getImages} from '../store/images'
import {v1 as uuid} from 'uuid'

function Images(props) {
  //const [images, setImages] = useState('')
  const dispatch = useDispatch()
  const imgArr = useSelector(state => state.images)

  useEffect(() => {
    dispatch(getImages())
  }, [])
  // IMAGE FUNCTIONS

  const addImage = (image, emit = false) => {
    let canvas = props.canvas
    if (emit) {
      fabric.Image.fromURL(image.image.src, function(oImg) {
        oImg.scale(0.25)
        oImg.id = image.id
        canvas.add(oImg)
        console.log('added img: ', oImg)
      })
    } else {
      console.log('running addImage - not emitted')
      let id = uuid()
      fabric.Image.fromURL(image, function(oImg) {
        oImg.scale(0.25)
        oImg.id = id
        canvas.add(oImg)
        console.log('added img: ', oImg)
        // if this function is being called because the server broadcast an add-image event, don't emit it again
        socket.emit('add-image', {image: oImg, id: id})
        console.log('emitted add-image event')
      })
    }
  }

  // IMAGE EVENT LISTENERS

  // listen for the server to broadcast an add-image event, and call the addImage function
  socket.off('add-image')
  socket.on('add-image', image => {
    console.log(`socket ${socket.id} heard add-image event`)
    addImage(image, true)
  })

  return imgArr.length ? (
    <div className="Images">
      {imgArr.map(imageUrl => {
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

export default Images
