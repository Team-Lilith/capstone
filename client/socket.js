import io from 'socket.io-client'
import {fabric} from 'fabric'
import {fullRoom} from './store'
import {setCurrentRoom} from './store'
import history from './history'
import {realtimeDB} from '../server/db'

//CONNECTION

//establishes socket connection upon landing on webpage
const socket = io(window.location.origin)

//listens for connection and logs in browser terminal
socket.on('connect', () => {
  console.log('Connected!')
})

// HELPERS

const updateRoomMessages = (roomId, msg) => {
  let messages = realtimeDB.ref(roomId).child('messages')
  messages
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        let updatedMsgs = [...snapshot.val(), msg]
        messages.set(updatedMsgs)
        console.log('setting updated messages')
      } else {
        messages.set([msg])
        console.log('no messages yet - setting')
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

const updateRoomCanvas = (roomId, canvas) => {
  let canvasJSON = canvas.toDatalessJSON()
  let dbCanvas = realtimeDB.ref(roomId).child('canvas')
  dbCanvas.set(canvasJSON).catch(function(error) {
    console.error(error)
  })
}

//EMITTERS

export const sendMessage = data => {
  socket.emit('message', data)
  const user = data.user || 'none'
  const room = data.room
  const sendData = {msg: data.msg, user: user, room: room, id: data.id}
  updateRoomMessages(room, sendData)
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

export const emitModifiedCanvasObject = (objWithId, roomId) => {
  console.log('modified', objWithId, roomId)
  socket.emit('object-modified', objWithId)
  updateRoomCanvas(roomId, objWithId.obj.canvas)
}

// here we emit object added socket and send back object newly added
export const emitAddedToCanvas = objectAdded => {
  console.log('emit object added', objectAdded)
  socket.emit('object added', objectAdded)
  updateRoomCanvas(objectAdded.room, objectAdded.obj.canvas)
}

export const emitCanvasRemoveChange = objectRemoved => {
  console.log('emit object removed', objectRemoved)
  socket.emit('object removed', objectRemoved)
}

//LISTENERS
export const modifyCanvasObject = canvas => {
  //listens for object modified
  socket.on('new-modification', data => {
    console.log('looking for object that changed layer', data)
    canvas.getObjects().forEach(object => {
      if (object.id === data.id) {
        // canvas.getObjects().indexOf(data.obj)
        //finds obj on canvas by id + sets modified obj to that obj to update it
        object.set(data.obj)
        //set Coords allows obj to be remodified after updating
        object.setCoords()
        canvas.renderAll()
      }
    })
  })
}

export const receiveAddedObject = canvas => {
  socket.off('canvas add change')
  socket.on('canvas add change', data => {
    console.log('receive object', data)
    const {obj, id} = data
    let object
    if (obj.type === 'rect') {
      object = new fabric.Rect({
        height: obj.height,
        width: obj.width,
        fill: obj.fill
      })
    } else if (obj.type === 'circle') {
      object = new fabric.Circle({
        radius: obj.radius,
        fill: obj.fill
      })
    } else if (obj.type === 'triangle') {
      object = new fabric.Triangle({
        width: obj.width,
        height: obj.height,
        fill: obj.fill
      })
    } else if (obj.type === 'i-text') {
      object = new fabric.IText('Your thoughts here...', {
        left: obj.left,
        top: obj.top
      })
      object.enterEditing()
      canvas.setActiveObject(object)
    } else if (obj.type === 'path') {
      object = new fabric.Path(obj.path)
      object.set(obj)
    } else if (obj.type === 'image') {
      socket.off('add-image')
      let image = document.createElement('img')
      image.setAttribute('src', obj.src)
      console.log('IMAGE', image)
      object = new fabric.Image(image, obj)
      console.log('IMAGE OBJ', object)
    } else {
      return
    }
    object.emit = false
    object.id = id
    canvas.add(object)
    object.setCoords()
    canvas.requestRenderAll()
  })
}

export const receiveRemovedObject = canvas => {
  socket.on('canvas remove change', data => {
    console.log('receive object to delete', data)

    canvas.getObjects().forEach(object => {
      if (object.id === data.id) {
        canvas.remove(object)
        canvas.discardActiveObject()
        canvas.requestRenderAll()
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
export const receiveImage = (addToCanvas, canvas, roomId) => {
  socket.off('add-image')
  socket.on('add-image', image => {
    console.log('imageeee', image)
    addToCanvas(canvas, image, true, roomId)
  })
}
//user tried to join a full room => is routed back to home
export const receiveFullRoom = () => {
  socket.off('full room')
  socket.on('full room', () => {
    history.push('/join')
    console.log('room is full!')
    // toast notification ?
  })
}
//user tried to join a nonexistent room => is routed back to home
export const receiveNoRoom = () => {
  socket.off('no room')
  socket.on('no room', () => {
    history.push('/join')
    console.log('no such room!')
    // toast notification ?
  })
}

//user successfully joins room => is routed to room
export const joinSuccess = dispatch => {
  socket.off('join successful')
  socket.on('join successful', roomId => {
    dispatch(setCurrentRoom(roomId))
    history.push(`/room/${roomId}`)
  })
}

//user successfully creates room => is routed to room
export const createSuccess = dispatch => {
  socket.off('create successful')
  socket.on('create successful', roomId => {
    console.log('in create successful listener')
    dispatch(setCurrentRoom(roomId))
    history.push(`/room/${roomId}`)
    realtimeDB.ref(roomId).set({
      canvas: '',
      messages: [],
      users: ['user name here']
    })
  })
}

export default socket
