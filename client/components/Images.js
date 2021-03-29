import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {receiveImage} from '../socket'
import {getImages} from '../store/images'
import {addImage} from './FabricUtils'

function Images(props) {
  const dispatch = useDispatch()
  const allImages = useSelector(state => state.images)
  const roomId = useSelector(state => state.room)
  const [currentImages, setCurrentImages] = useState([])
  let canvas = props.canvas

  useEffect(
    () => {
      if (!allImages.length) {
        dispatch(getImages())
      } else {
        console.log(allImages)
        const imageCopy = JSON.parse(JSON.stringify(allImages))
        setCurrentImages(imageCopy)
      }
    },
    [allImages]
  )

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

  if (allImages.length) {
    // you may want to render these options in a map or loop of some sort
    return (
      <>
        <div id="image-container-header">
          <h3>Click an image to add it to your canvas!</h3>
          <select name="tags" id="tags" onChange={changeCategory}>
            <option>Pick an image category:</option>
            <option value="all">All Images</option>
            <option value="angel">Angels</option>
            <option value="animal">Animals</option>
            <option value="aura">Auras</option>
            <option value="cartoon">Cartoons</option>
            <option value="emoji">Emojis</option>
            <option value="flower">Flowers</option>
            <option value="frames">Frames</option>
            <option value="girly">Girly</option>
            <option value="love">Love</option>
            <option value="nature">Nature</option>
            <option value="people">People</option>
            <option value="quotes">Quotes</option>
            <option value="religious">Religious</option>
            <option value="selfie">Selfie</option>
            <option value="space">Space</option>
            <option value="unicorns">Unicorns</option>
            <option value="vintage">Vintage</option>
            <option value="wings">Wings</option>
          </select>
        </div>
        <div className="img-container">
          {currentImages.map(image => {
            let url = image.url
            return (
              <img
                src={url}
                onClick={() => addImage(canvas, url, false, roomId)}
                className="image-bar-image"
                key={url}
              />
            )
          })}
        </div>
      </>
    )
  } else {
    return 'No images.'
  }
}

export default Images
