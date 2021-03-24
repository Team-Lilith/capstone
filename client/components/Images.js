import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import socket from '../socket'
import {getImages} from '../store/images'
import {addImage} from './FabricUtils'

function Images(props) {
  const dispatch = useDispatch()
  const allImages = useSelector(state => state.images)
  const [currentImages, setCurrentImages] = useState([])
  let canvas = props.canvas

  useEffect(
    () => {
      if (!allImages.length) {
        dispatch(getImages())
        console.log('!all images - dispatch get images')
      } else {
        console.log(allImages)
        console.log('allimages found = set as currentImages')
        const imageCopy = JSON.parse(JSON.stringify(allImages))
        setCurrentImages(imageCopy)
      }
    },
    [allImages]
  )

  // IMAGE EVENT LISTENERS
  // listen for the server to broadcast an add-image event, and call the addImage function
  socket.off('add-image')
  socket.on('add-image', image => {
    addImage(canvas, image, true)
  })

  const changeCategory = e => {
    let cat = e.target.value
    if (cat !== 'all') {
      const imageCopy = JSON.parse(JSON.stringify(allImages))
      const filter = imageCopy.filter(function(image) {
        let tags = image.tags
        if (tags && tags.includes(cat)) return true
      })
      setCurrentImages(filter)
    } else {
      const imageCopy = JSON.parse(JSON.stringify(allImages))
      setCurrentImages(imageCopy)
    }
  }

  if (currentImages.length) {
    return (
      <>
        <label htmlFor="tags">Choose a category:</label>
        <select name="tags" id="tags" onChange={changeCategory}>
          <option value="all">All</option>
          <option value="abstract">Abstract</option>
          <option value="frame">Frames</option>
          <option value="cartoon">Cartoon</option>
          <option value="animal">Animals</option>
        </select>

        <div className="Images">
          {currentImages.map(image => {
            if (image.tags) console.log(image.tags)
            let url = image.url
            return (
              <img
                src={url}
                onClick={() => addImage(canvas, url, false)}
                className="image-bar-image"
                key={url}
              />
            )
          })}
        </div>
      </>
    )
  } else {
    return 'no images'
  }
}

export default Images
