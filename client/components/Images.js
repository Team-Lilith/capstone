import {fabric} from 'fabric'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import socket from '../socket'
import {getImages} from '../store/images'

function Images(props) {
  //const [images, setImages] = useState('')
  const dispatch = useDispatch()
  const imgArr = useSelector(state => state.images)

  useEffect(() => {
    console.log('setting images in effect hook')
    dispatch(getImages())
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
