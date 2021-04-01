import React from 'react'
import {saveCanvas} from '../store'
import {Tooltip} from '@material-ui/core'

//should render a button
//button should save canvas to db

//always updated canvas should be on state
//messages should be on state
//canvas + messages should be in local storage

function Save(props) {
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
      {/* <button type="submit" onClick={() => saveToPng(canvas)}>
        Save to Computer!
      </button> */}
    </div>
  )
}

export default Save
