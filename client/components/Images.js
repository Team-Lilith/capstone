import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {receiveImage} from '../socket'
import {getImages} from '../store/images'
import {addImage} from './FabricUtils'

function Images(props) {
  const dispatch = useDispatch()
  const imgArr = useSelector(state => state.images)
  let canvas = props.canvas

  useEffect(() => {
    dispatch(getImages())
  }, [])

  return imgArr.length ? (
    <div className="Images">
      {imgArr.map(imageUrl => {
        return (
          <img
            src={imageUrl}
            onClick={() => addImage(canvas, imageUrl, false)}
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
