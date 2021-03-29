import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {receiveImage} from '../socket'
import {getImages} from '../store/images'
import {addImage} from './FabricUtils'

function Images(props) {
  const dispatch = useDispatch()
  const allImages = useSelector(state => state.images)
  //dummy image data to avoid excessive calls to db when testing non-image features
  // const allImages = [
  //   {
  //     url:
  //       'https://firebasestorage.googleapis.com/v0/b/capstone-e6ea2.appspot.com/o/5a00520e092a74e5b928e76a.png?alt=media&token=8a9cc950-779a-4bd6-b6c6-1b4e01c34906'
  //   },
  //   {
  //     url:
  //       'https://firebasestorage.googleapis.com/v0/b/capstone-e6ea2.appspot.com/o/Cute-Pug-PNG-File.png?alt=media&token=4066c001-8fa0-4a8a-95c4-0fc69a28c43c'
  //   },
  //   {
  //     url:
  //       'https://firebasestorage.googleapis.com/v0/b/capstone-e6ea2.appspot.com/o/chih.png?alt=media&token=1a838809-b790-40b0-9c54-3009a424ba03'
  //   },
  //   {
  //     url:
  //       'https://firebasestorage.googleapis.com/v0/b/capstone-e6ea2.appspot.com/o/corgi.png?alt=media&token=f31a77df-2170-43ff-8909-531b00f55086'
  //   }
  // ]
  const roomId = useSelector(state => state.room)
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
    return (
      <>
        <div id="image-container-header">
          <h2>Click an image to add it to your canvas!</h2>
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
