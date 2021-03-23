import io from 'socket.io-client'
import {fullRoom} from './store'

//CONNECTION

//establishes socket connection upon landing on webpage
const socket = io(window.location.origin)

//listens for connection and logs in browser terminal
socket.on('connect', () => {
  console.log('Connected!')
})

//EMITTERS
export const sendMessage = message => {
  socket.emit('message', message)
}

export const emitImage = imageObjWithId => {
  socket.emit('add-image', imageObjWithId)
}

export const emitCreateRoom = id => {
  socket.emit('create room', id)
}

export const emitJoinRoom = id => {
  socket.emit('join room', id)
}

export const emitModifiedCanvasObject = objWithId => {
  socket.emit('object-modified', objWithId)
}

//LISTENERS
export const modifyCanvasObject = canvas => {
  //listens for object modified
  socket.on('new-modification', data => {
    canvas.getObjects().forEach(object => {
      if (object.id === data.id) {
        //finds obj on canvas by id + sets modified obj to that obj to update it
        object.set(data.obj)
        //set Coords allows obj to be remodified after updating
        object.setCoords()
        canvas.renderAll()
      }
    })
  })
}

//takes in setState and prevState to update messages on state when socket receives message
export const receiveMessageAndUpdateState = (setState, prevState) => {
  socket.on('message', msg => {
    setState([...prevState, msg])
  })
}
//takes in addImage func, canvas, passing isReceiving to addImage as true so it does not emit
export const receiveImage = (addToCanvas, canvas) => {
  socket.off('add-image')
  socket.on('add-image', image => {
    addToCanvas(canvas, image, true)
  })
}
//user tried to join a full room => is routed back to home
export const receiveFullRoom = dispatch => {
  socket.on('full room', () => {
    dispatch(fullRoom())
  })
}
//user tried to join a nonexistent room => is routed back to home
export const receiveNoRoom = dispatch => {
  socket.on('no room', () => {
    dispatch(fullRoom())
  })
}

export default socket
