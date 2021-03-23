import React, {useEffect} from 'react'
import {ChromePicker} from 'react-color'
import {fabric} from 'fabric'

function Tools(props) {
  const canvas = props.canvas
  let currentMode
  let mousePressed = false
  let image =
    'https://ctl.s6img.com/society6/img/Cf95RKFdxsaz1o2YTpdEPM_ZkFM/w_700/canvas/~artwork/s6-0009/a/2099891_14762463/~~/white-stf-canvas.jpg'
  const svgState = {}
  const group = {}
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
      if (props.canvas) {
        setPanEvents(props.canvas)
        setBackground(image, props.canvas)
      }
    },
    [setPanEvents, props.canvas]
  )

  const handleImageUpload = event => {
    const reader = new FileReader()
    const imageToUpload = event.target.files[0]
    reader.readAsDataURL(imageToUpload)
    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, img => {
        img.scaleToHeight(300)
        props.canvas.add(img)
        props.canvas.requestRenderAll()
      })
    })
  }

  const handleColorChange = color => {
    setColor(color.hex)
  }

  const groupObjects = (canvas, group, shouldGroup) => {
    if (shouldGroup) {
      const objects = canvas.getObjects()
      group.val = new fabric.Group(objects)
      clearCanvas(canvas, svgState)
      canvas.add(group.val)
      canvas.requestRenderAll()
    } else {
      group.val.destroy()
      const oldGroup = group.val.getObjects()
      clearCanvas(canvas, svgState)
      canvas.add(...oldGroup)
      group.val = null
      canvas.requestRenderAll()
    }
  }

  const clearCanvas = (canvas, svg) => {
    svg.val = canvas.toSVG()
    canvas.getObjects().forEach(obj => {
      if (obj !== canvas.backgroundImage) canvas.remove(obj)
    })
  }

  const restoreCanvas = (canvas, svg, image) => {
    if (svg.val) {
      fabric.loadSVGFromString(svg.val, objects => {
        objects = objects.filter(object => object['xlink:href'] !== image)
        canvas.add(...objects)
        canvas.requestRenderAll()
      })
    }
  }

  const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, img => {
      canvas.backgroundImage = img
      canvas.renderAll()
    })
  }

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

  const toggleMode = (mode, canvas) => {
    if (mode === modes.pan) {
      if (currentMode === modes.pan) {
        currentMode = ''
      } else {
        currentMode = modes.pan
        canvas.isDrawingMode = false
        props.canvas.requestRenderAll()
      }
    } else if (mode === modes.drawing) {
      if (currentMode === modes.drawing) {
        currentMode = ''
        canvas.isDrawingMode = false
        canvas.requestRenderAll()
      } else {
        //change brush options for future reference here
        //   canvas.freeDrawingBrush.color = "red";
        //   canvas.freeDrawingBrush.width = 15;
        //   canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
        //   canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);

        currentMode = modes.drawing
        canvas.freeDrawingBrush.color = color
        canvas.isDrawingMode = true
        canvas.requestRenderAll()
      }
    }
  }

  const addRect = canvas => {
    const rect = new fabric.Rect({
      height: 100,
      width: 500,
      fill: 'black',
      cornerColor: 'white'
    })
    canvas.add(rect)
    canvas.renderAll()
  }

  const addCirc = canvas => {
    const circle = new fabric.Circle({
      radius: 100,
      fill: 'black',
      cornerColor: 'white'
    })
    canvas.add(circle)
    canvas.renderAll()
  }

  const addTri = canvas => {
    const triangle = new fabric.Triangle({
      width: 80,
      height: 100,
      fill: 'black',
      cornerColor: 'white'
    })
  }

  return (
    <div className="App">
      <button type="button" onClick={() => addRect(props.canvas)}>
        Rectangle
      </button>
      <button type="button" onClick={() => addCirc(props.canvas)}>
        Add Circle
      </button>
      <button type="button" onClick={() => addTri(props.canvas)}>
        Add Triangle
      </button>

      <button onClick={() => toggleMode(modes.drawing, props.canvas)}>
        Draw
      </button>

      <button type="button" onClick={() => deselect(props.canvas)}>
        Deselect
      </button>
      <button onClick={() => groupObjects(props.canvas, group, true)}>
        Group
      </button>
      <button onClick={() => groupObjects(props.canvas, group, false)}>
        Ungroup
      </button>

      <button onClick={() => toggleMode(modes.pan, props.canvas)}>
        Drag Canvas
      </button>
      <button onClick={() => clearCanvas(props.canvas, svgState)}>
        Clear Canvas
      </button>
      <button onClick={() => restoreCanvas(props.canvas, svgState, image)}>
        Restore Canvas
      </button>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <ChromePicker color={color} onChange={handleColorChange} />
    </div>
  )
}

export default Tools
