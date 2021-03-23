import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import socket from '../socket'
import {getImages} from '../store/images'
import {addImage} from './FabricUtils'

function Images(props) {
  const dummyArray = [
    {
      url: 'http://www.pngall.com/wp-content/uploads/5/Cute-Pug-PNG-File.png',
      tags: ['dog']
    },
    {
      url:
        'http://www.pngall.com/wp-content/uploads/5/Corner-Watercolor-Flower-PNG.png',
      tags: ['flower']
    },
    {
      url:
        'http://www.pngall.com/wp-content/uploads/5/Polaroid-PNG-Clipart.png',
      tags: ['frame']
    },
    {
      url:
        'http://www.pngall.com/wp-content/uploads/2016/06/Godzilla-Download-PNG.png'
    }
  ]

  // const dispatch = useDispatch()
  // const allImages = useSelector(state => state.images)
  const [allImages, setAllImages] = useState([])
  const [currentImages, setCurrentImages] = useState([])
  let canvas = props.canvas

  // hook to get images from db
  useEffect(() => {
    // dispatch(getImages())
    setAllImages(dummyArray) // using dummy data instead of getting images from db
    console.log('1ST USE EFFECT, GETTING IMAGES=>')
    console.log('ALLIMAGES =>', allImages)
  }, [])

  // hook to set images pull from db as 'currentImages' on state
  useEffect(
    () => {
      console.log(
        '=> allImages changed - use effect to set currentImages running'
      )
      console.log('ALLIMAGES =>', allImages)
      setCurrentImages([...allImages])
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
      let filter = allImages.filter(function(image) {
        let tags = image.tags
        if (tags && tags.includes(cat)) return true
      })
      let filteredImages = [...filter]
      setCurrentImages(filteredImages)
    } else {
      setCurrentImages(allImages)
    }
  }

  if (allImages.length) {
    return (
      <>
        <label htmlFor="tags">Choose a category:</label>
        <select name="tags" id="tags" onChange={changeCategory}>
          <option value="all">All</option>
          <option value="dog">Dogs</option>
          <option value="frame">Frames</option>
          <option value="flower">Flowers</option>
        </select>

        <div className="Images">
          {currentImages.map(image => {
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
          {/* {currentImages.length
          ? currentImages.map(image => {
            let url = image.url
            return (
              <img
                src={url}
                onClick={() => addImage(canvas, url, false)}
                className="image-bar-image"
                key={url}
              />
            )})
            : allImages.map(image => {
            let url = image.url
            return (
              <img
                src={url}
                onClick={() => addImage(canvas, url, false)}
                className="image-bar-image"
                key={url}
              />
            )})
} */}
        </div>
      </>
    )
  } else {
    return 'no images'
  }
}

export default Images
