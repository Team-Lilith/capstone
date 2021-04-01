import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {fetchSingleCanvas} from '../store'
import {fabric} from 'fabric'

function SingleCanvas(props) {
  const dispatch = useDispatch()
  let {id} = useParams()
  const singleCanvas = useSelector(state => state.gallery)

  useEffect(
    () => {
      if (!singleCanvas.length) {
        dispatch(fetchSingleCanvas(id))
      }
    },
    [singleCanvas]
  )

  return (
    <div>
      <div>
        <canvas id={id} className="gallery-element" />
      </div>
    </div>
  )
}

export default SingleCanvas
