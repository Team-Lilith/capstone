import React, {useEffect} from 'react'
import {ChromePicker} from 'react-color'
import {emitModifiedCanvasObject} from '../socket'
import {
  addRect,
  addCirc,
  addTri,
  deselect,
  groupObjects,
  toggleMode,
  clearCanvas,
  restoreCanvas
} from './FabricUtils'

function Tools(props) {
  const canvas = props.canvas

  let mousePressed = false
  let image =
    'https://ctl.s6img.com/society6/img/Cf95RKFdxsaz1o2YTpdEPM_ZkFM/w_700/canvas/~artwork/s6-0009/a/2099891_14762463/~~/white-stf-canvas.jpg'

  const group = {}

  let currentMode
  const modes = {
    pan: 'pan',
    drawing: 'drawing'
  }
  const [color, setColor] = React.useState('fff')

  // CANVAS EVENT LISTENER - OBJECT MODIFIED
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
  }

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

  // const groupObjects = (canvas, group, shouldGroup) => {
  //   if (shouldGroup) {
  //     const objects = canvas.getObjects()
  //     group.val = new fabric.Group(objects)
  //     clearCanvas(canvas, svgState)
  //     canvas.add(group.val)
  //     canvas.requestRenderAll()
  //   } else {
  //     group.val.destroy()
  //     const oldGroup = group.val.getObjects()
  //     clearCanvas(canvas, svgState)
  //     canvas.add(...oldGroup)
  //     group.val = null
  //     canvas.requestRenderAll()
  //   }
  // }

  // const clearCanvas = (canvas, svg) => {
  //   svg.val = canvas.toSVG()
  //   canvas.getObjects().forEach(obj => {
  //     if (obj !== canvas.backgroundImage) canvas.remove(obj)
  //   })
  // }

  // const restoreCanvas = (canvas, svg, image) => {
  //   if (svg.val) {
  //     fabric.loadSVGFromString(svg.val, objects => {
  //       objects = objects.filter(object => object['xlink:href'] !== image)
  //       canvas.add(...objects)
  //       canvas.requestRenderAll()
  //     })
  //   }
  // }

  const setPanEvents = canvas => {
    //Mouse Events
    canvas.on('mouse:move', options => {
      if (mousePressed && currentMode === modes.pan) {
        canvas.setCursor('grab')
        canvas.renderAll()

        const mEvent = options.e
        const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
        canvas.relativePan(delta)
      }
    })

    canvas.on('mouse:down', event => {
      mousePressed = true
      if (currentMode === modes.pan) {
        canvas.setCursor('grab')
        canvas.renderAll()
      }
    })

    canvas.on('mouse:up', event => {
      mousePressed = false
      canvas.setCursor('default')
      canvas.renderAll()
    })
  }

  return (
    <div className="App">
      <button type="button" onClick={() => addRect(canvas)}>
        Rectangle
      </button>
      <button type="button" onClick={() => addCirc(canvas)}>
        Add Circle
      </button>
      <button type="button" onClick={() => addTri(canvas)}>
        Add Triangle
      </button>

      <button onClick={() => toggleMode(modes.drawing, canvas, color)}>
        Draw
      </button>

      <button type="button" onClick={() => deselect(canvas)}>
        Deselect
      </button>
      <button onClick={() => groupObjects(canvas, group, true)}>Group</button>
      <button onClick={() => groupObjects(canvas, group, false)}>
        Ungroup
      </button>

      <button onClick={() => toggleMode(modes.pan, canvas, color)}>
        Drag Canvas
      </button>
      <button onClick={() => clearCanvas(canvas, svgState)}>
        Clear Canvas
      </button>
      <button onClick={() => restoreCanvas(canvas, svgState, image)}>
        Restore Canvas
      </button>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <ChromePicker color={color} onChange={handleColorChange} />
    </div>
  )
}

export default Tools
