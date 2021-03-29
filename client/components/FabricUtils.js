import {fabric} from 'fabric'
import {v1 as uuid} from 'uuid'
import socket, {emitImage} from '../socket'

// You may want to move this file out of the components folder

// TOOLS
// we are giving ids to be able to identify each object
// it was prev comming undefined
// and once object:moves triggered it merged the objects
// instead of moving each one separately
export const addRect = canvas => {
  const rect = new fabric.Rect({
    height: 100,
    width: 500,
    fill: 'black'
  })
  rect.id = uuid()
  canvas.add(rect)
  canvas.renderAll()
}

export const addCirc = canvas => {
  const circle = new fabric.Circle({
    radius: 100,
    fill: 'black'
  })
  circle.id = uuid()
  canvas.add(circle)
  canvas.renderAll()
}

export const addTri = canvas => {
  const triangle = new fabric.Triangle({
    width: 80,
    height: 100,
    fill: 'black'
  })
  triangle.id = uuid()
  canvas.add(triangle)
  canvas.renderAll()
}

export const addText = canvas => {
  var text = new fabric.IText('Your thoughts here...', {
    left: 40,
    top: 50
  })
  text.id = uuid()
  text.hasRotatingPoint = true
  canvas.add(text).setActiveObject(text)
  text.enterEditing()
}

export const deselect = canvas => {
  canvas.discardActiveObject()
  canvas.requestRenderAll()
}

export const bringForward = canvas => {
  let selected = canvas.getActiveObject() || canvas.getActiveGroup()

  if (selected) {
    selected.bringForward()
    // selected.sentFront = true
    // console.log('selected', selected)
  }
  canvas.requestRenderAll()
}

export const sendBackwards = canvas => {
  let selected = canvas.getActiveObject() || canvas.getActiveGroup()

  if (selected) {
    selected.sendBackwards()
    // selected.sentBack = true
    // console.log('selected', selected)
  }
  canvas.requestRenderAll()
}

export const deleteSelected = canvas => {
  let selected = canvas.getActiveObject()
  canvas.remove(selected)
  canvas.discardActiveObject()
  canvas.requestRenderAll()
}

export const setCanvasBackground = (url, canvas) => {
  fabric.Image.fromURL(url, img => {
    canvas.backgroundImage = img
    canvas.renderAll()
  })
}

export const toggleMode = (mode, canvas, color) => {
  let currentMode
  const modes = {
    pan: 'pan',
    drawing: 'drawing'
  }

  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = ''
    } else {
      currentMode = modes.pan
      canvas.isDrawingMode = false
      canvas.requestRenderAll()
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

export const groupObjects = (canvas, group, shouldGroup) => {
  const svgState = {}
  if (shouldGroup) {
    const objects = canvas.getObjects()
    group.val = new fabric.Group(objects)
    // clearCanvas(canvas, svgState)
    // socket.off('canvas add change')
    canvas.add(group.val)
    canvas.requestRenderAll()
  } else {
    group.val.destroy()
    const oldGroup = group.val.getObjects()
    // clearCanvas(canvas, svgState)
    // socket.off('canvas add change')
    canvas.add(...oldGroup)
    group.val = null
    canvas.requestRenderAll()
  }
}

export const clearCanvas = (canvas, svg) => {
  svg.val = canvas.toSVG()
  canvas.getObjects().forEach(obj => {
    if (obj !== canvas.backgroundImage) canvas.remove(obj)
  })
}

export const restoreCanvas = (canvas, svg) => {
  if (svg.val) {
    fabric.loadSVGFromString(svg.val, objects => {
      canvas.add(...objects)
      canvas.requestRenderAll()
    })
  }
}

export const setPanEvents = canvas => {
  let mousePressed = false
  let currentMode
  const modes = {
    pan: 'pan',
    drawing: 'drawing'
  }

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

// IMAGES
export const addImage = (canvas, image, isReceived = false, roomId) => {
  //image being received
  if (isReceived) {
    fabric.Image.fromURL(image.image.src, function(oImg) {
      oImg.scale(0.25)
      oImg.id = image.id
      canvas.add(oImg)
    })
  } else {
    //image being added and sent to room
    let id = uuid()
    fabric.Image.fromURL(image, function(oImg) {
      oImg.scale(0.25)
      oImg.id = id
      canvas.add(oImg)
      //why do we need to define new obj?
      emitImage({image: oImg, id: id, room: roomId})
    })
  }
}

// OBJECTS
export const addObject = (canvas, object, isAdded = false) => {
  if (isAdded) {
    canvas.add(object)
  }
}
