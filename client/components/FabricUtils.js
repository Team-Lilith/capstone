import {fabric} from 'fabric'
import {v1 as uuid} from 'uuid'
import socket from '../socket'

// TOOLS
export const addRect = canvas => {
  const rect = new fabric.Rect({
    height: 100,
    width: 500,
    fill: 'black'
  })
  canvas.add(rect)
  canvas.renderAll()
}

export const addCirc = canvas => {
  const circle = new fabric.Circle({
    radius: 100,
    fill: 'lightblue'
  })
  canvas.add(circle)
  canvas.renderAll()
}

export const addTri = canvas => {
  const triangle = new fabric.Triangle({
    width: 80,
    height: 100,
    fill: 'mistyrose'
  })
  canvas.add(triangle)
  canvas.renderAll()
}

export const deselect = canvas => {
  canvas.discardActiveObject()
  canvas.requestRenderAll()
}

// IMAGES

export const addImage = (canvas, image, emit = false) => {
  //image being received
  if (emit) {
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
      socket.emit('add-image', {image: oImg, id: id})
    })
  }
}
