import React from 'react'
import {saveCanvas, saveToPng} from '../store'
import {Tooltip} from '@material-ui/core'

//should render a button
//button should save canvas to db

//always updated canvas should be on state
//messages should be on state
//canvas + messages should be in local storage

function Save(props) {
  const canvas = props.canvas
  return (
    <div>
      <Tooltip title="Save Canvas" arrow>
        <img
          type="submit"
          src="/images/diskette.png"
          className="nav-button"
          onClick={() => saveCanvas(canvas)}
        />
      </Tooltip>
      {/* <button type="submit" onClick={() => saveToPng(canvas)}>
        Save to Computer!
      </button> */}
    </div>
  )
}

export default Save
