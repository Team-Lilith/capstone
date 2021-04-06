import React from 'react'
import {saveCanvas, saveToPng} from '../store'
import {Tooltip} from '@material-ui/core'

//should render a button
//button should save canvas to db

//always updated canvas should be on state
//messages should be on state
//canvas + messages should be in local storage

function Save(props) {
  const canvasEl = document.getElementById('canvas')
  return (
    <div>
      <Tooltip title="Save Canvas and Finish" arrow>
        <img
          type="submit"
          src="/images/diskette.png"
          className="nav-button"
          onClick={props.toggleSaveForm}
        />
      </Tooltip>
      <Tooltip title="Download Canvas" arrow>
        <button className="download-button" onClick={() => saveToPng(canvasEl)}>
          <img className="nav-button" src="/images/direct-download.png" />
        </button>
      </Tooltip>
    </div>
  )
}

export default Save
