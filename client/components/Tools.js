import React, {useEffect} from 'react'
import {HuePicker} from 'react-color'
import {MenuItem, Select} from '@material-ui/core'
import {v1 as uuid} from 'uuid'
import {Tooltip} from '@material-ui/core'
import socket, {
  emitModifiedCanvasObject,
  emitAddedToCanvas,
  emitCanvasRemoveChange,
  emitImage
} from '../socket'
import {
  addRect,
  addCirc,
  addTri,
  addText,
  deselect,
  groupObjects,
  toggleMode,
  clearCanvas,
  restoreCanvas,
  setPanEvents,
  deleteSelected,
  bringForward,
  sendBackwards,
  changeFont
} from './FabricUtils'
import Save from './Save'

function Tools(props) {
  const canvas = props.canvas
  const roomId = props.roomId
  const group = {}
  const svgState = {}
  const modes = {
    pan: 'pan',
    drawing: 'drawing'
  }
  // const fonts = ['Arial', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Tahoma', 'Trebuchet MS', 'Arial Black', 'Impact', 'Comic Sans MS']
  const [color, setColor] = React.useState('fff')
  const [font, setFont] = React.useState('')

  useEffect(
    () => {
      if (canvas) {
        canvas.on('object:modified', function(options) {
          if (options.target) {
            const objModified = {
              obj: options.target,
              id: options.target.id
            }
            emitModifiedCanvasObject(objModified)
          }
        })
        // this canvas event listens to objects moving
        // this is how we can see two objects move @ same time
        // id had to be changed bc comming undefined
        // ^dets in fabric utils file
        canvas.on('object:moving', function(options) {
          if (options.target) {
            const objModified = {
              obj: options.target,
              id: options.target.id
            }
            emitModifiedCanvasObject(objModified)
          }
        })
        canvas.on('object:added', function(options) {
          if (!options.target.id) options.target.id = uuid()
          // same with images we are having a bool
          // to dictate to emit or not
          // if not it will be a ping pong event and
          // objects will be added more than 20 times
          // see socket file for more dets
          if (options.target.emit === false) return
          emitAddedToCanvas({
            obj: options.target,
            id: options.target.id,
            room: roomId
          })
        })

        canvas.on('object:removed', function(options) {
          if (!options.target.id) options.target.id = uuid()
          // if (options.target.emit === false) return

          emitCanvasRemoveChange({
            obj: options.target,
            id: options.target.id,
            room: roomId
          })
        })
      }
    },
    [canvas]
  )

  useEffect(
    () => {
      if (canvas) {
        setPanEvents(canvas)
      }
    },
    [setPanEvents, canvas]
  )

  const handleColorChange = color => {
    setColor(color.hex)
  }

  // const handleFontChange = font => {
  //   setFont(font)
  // }

  const handleImageUpload = event => {
    const reader = new FileReader()
    const imageToUpload = event.target.files[0]
    reader.readAsDataURL(imageToUpload)
    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, img => {
        img.scaleToHeight(300)
        canvas.add(img)
        canvas.requestRenderAll()
      })
    })
  }

  return (
    <div id="tools-inner">
      <div id="tools-buttons">
        <Tooltip title="Deselect" arrow>
          <img
            className="nav-button"
            src="/images/cursor.png"
            onClick={() => deselect(props.canvas)}
          />
        </Tooltip>
        <Tooltip title="Draw" arrow>
          <img
            className="nav-button"
            src="/images/drawing.png"
            onClick={() => toggleMode(modes.drawing, canvas, color)}
          />
        </Tooltip>

        <Tooltip title="Stop Drawing" arrow>
          <img
            className="nav-button"
            src="/images/move.png"
            onClick={() => toggleMode(modes.pan, canvas, color)}
          />
        </Tooltip>

        <Tooltip title="Add Rectangle" arrow>
          <img
            className="nav-button"
            src="/images/rectangle.png"
            onClick={() => addRect(color, canvas)}
          />
        </Tooltip>

        <Tooltip title="Add Circle" arrow>
          <img
            className="nav-button"
            src="/images/dry-clean.png"
            onClick={() => addCirc(color, canvas)}
          />
        </Tooltip>

        <Tooltip title="Add Triangle" arrow>
          <img
            className="nav-button"
            src="/images/up-arrow (2).png"
            onClick={() => addTri(color, canvas)}
          />
        </Tooltip>

        <Tooltip title="Add Text" arrow>
          <img
            className="nav-button"
            src="/images/font.png"
            onClick={() => addText(color, canvas)}
          />
        </Tooltip>

        <Tooltip title="Change Font" arrow>
          <Select
            className="nav-button"
            value=""
            onChange={event => {
              setFont(event.target.value)
              changeFont(canvas, event.target.value)
            }}
          >
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            <MenuItem value="Times">Times</MenuItem>
            <MenuItem value="Courier New">Courier New</MenuItem>
            <MenuItem value="Courier">Courier</MenuItem>
            <MenuItem value="Verdana">Verdana</MenuItem>
            <MenuItem value="Georgia">Georgia</MenuItem>
            <MenuItem value="Palatino">Palatino</MenuItem>
            <MenuItem value="Garamond">Garamond</MenuItem>
            <MenuItem value="Bookman">Bookman</MenuItem>
            <MenuItem value="Tahoma">Tahoma</MenuItem>
            <MenuItem value="Trebuchet MS">Trebuchet MS</MenuItem>
            <MenuItem value="Arial Black">Arial Black</MenuItem>
            <MenuItem value="Impact">Impact</MenuItem>
            <MenuItem value="Comic Sans MS">Comic Sans MS</MenuItem>
          </Select>
        </Tooltip>

        {/* <Tooltip title="Change Font" arrow>
          <img className="nav-button"
            src="/images/font (1).png"
            onClick={() => changeFont(canvas, font)}/>
        </Tooltip> */}

        <Tooltip title="Upload Image" arrow>
          <div>
            <img
              className="nav-button"
              src="/images/insert-picture-icon.png"
              onClick={() =>
                document.getElementById('tools-image-upload').click()
              }
            />
            <input
              id="tools-image-upload"
              className="nav-button"
              style={{display: 'none'}}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </Tooltip>

        <Tooltip title="Delete Selected" arrow>
          <img
            className="nav-button"
            src="/images/rubber.png"
            onClick={() => deleteSelected(canvas)}
          />
        </Tooltip>

        <Tooltip title="Bring Forward" arrow>
          <img
            className="nav-button"
            src="/images/up-arrow.png"
            onClick={() => bringForward(canvas, roomId)}
          />
        </Tooltip>

        <Tooltip title="Send Backwards" arrow>
          <img
            className="nav-button"
            src="/images/down-arrow.png"
            onClick={() => sendBackwards(canvas, roomId)}
          />
        </Tooltip>

        <Tooltip title="Group All" arrow>
          <img
            className="nav-button"
            src="/images/object.png"
            onClick={() => groupObjects(canvas, group, true)}
          />
        </Tooltip>

        <Tooltip title="Ungroup" arrow>
          <img
            className="nav-button"
            src="/images/ungroup.png"
            onClick={() => groupObjects(canvas, group, false)}
          />
        </Tooltip>

        <Tooltip title="Clear Canvas" arrow>
          <img
            className="nav-button"
            src="/images/trash.png"
            onClick={() => clearCanvas(canvas, svgState)}
          />
        </Tooltip>

        <Tooltip title="Restore Canvas" arrow>
          <img
            className="nav-button"
            src="/images/back-arrow.png"
            onClick={() => restoreCanvas(canvas, svgState)}
          />
        </Tooltip>

        <Save canvas={canvas} />
      </div>
      <div className="tools-colors">
        <Tooltip title="Drawing Color" arrow>
          <HuePicker color={color} onChange={handleColorChange} />
        </Tooltip>
      </div>
    </div>
  )
}

export default Tools
