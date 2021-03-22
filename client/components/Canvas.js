import React from 'react'
import socket from '../socket'
import {fabric} from 'fabric'

function Canvas(props) {
  const canvas = props.canvas

  // OBJECT MODIFIED EVENT LISTENER MOVED TO TOOLS
  if (canvas) {
    socket.on('new-modification', data => {
      console.log('heard new-modification event', typeof data, data)

      console.log(typeof data.obj, ' =>', data.obj)
      console.log('id => ', data.id)
      canvas.getObjects().forEach(object => {
        console.log(object.id)
        if (object.id === data.id) {
          console.log(`found object ${object.id}! => `, object)
          object.set(data.obj)
          object.setCoords()
          canvas.renderAll()
        }
      })
    })
  }

  return <></>
}

export default Canvas
