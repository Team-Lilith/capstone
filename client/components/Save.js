import React from 'react'
import {saveCanvas, saveToPng} from '../store'
//should render a button
//button should save canvas to db

//always updated canvas should be on state
//messages should be on state
//canvas + messages should be in local storage

function Save(props) {
  const canvas = props.canvas
  return (
    <div>
      <button type="submit" onClick={() => saveCanvas(canvas)}>
        Save!
      </button>
      {/* <button type="submit" onClick={() => saveToPng(canvas)}>
        Save to Computer!
      </button> */}
    </div>
  )
}

export default Save
