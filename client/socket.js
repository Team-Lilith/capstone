import io from 'socket.io-client'
import {fabric} from 'fabric'
import {setCurrentRoom} from './store'
import history from './history'
import {realtimeDB} from '../server/db'
import {toast} from 'react-toastify'

//CONNECTION

//establishes socket connection upon landing on webpage
const socket = io(window.location.origin)

//listens for connection and logs in browser terminal
socket.on('connect', () => {
  console.log('Connected!')
})

//EMITTERS
// HELPERS

// update our messages stored in the DB when a message is added
const updateRoomMessages = (roomId, msg) => {
  let messages = realtimeDB.ref(roomId).child('messages')
  messages
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        let updatedMsgs = [...snapshot.val(), msg]
        messages.set(updatedMsgs)
      } else {
        messages.set([msg])
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

// update our current canvas in the DB with modifications
const updateRoomCanvas = (roomId, canvas) => {
  let canvasJSON = canvas.toDatalessJSON()
  let dbCanvas = realtimeDB.ref(roomId).child('canvas')
  dbCanvas.set(canvasJSON).catch(function(error) {
    console.error(error)
  })
}

// update our array of object ids in DB when adding a new object
const updateObjIds = (roomId, objId) => {
  let ids = realtimeDB.ref(roomId).child('objectIds')
  ids
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        let updatedIds = [...snapshot.val(), objId]
        ids.set(updatedIds)
      } else {
        ids.set([objId])
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

// update our array of object ids in DB when removing an object
const removeObjId = (roomId, objId) => {
  let ids = realtimeDB.ref(roomId).child('objectIds')
  ids
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        let idArray = snapshot.val()
        let updatedIds = idArray.filter(elem => elem !== objId)
        ids.set(updatedIds)
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

// update our array of obj ids in the DB when adjusting layers
const updateObjIdxs = (roomId, canvas) => {
  let objs = canvas._objects
  let newIds = []
  for (let i = 0; i < objs.length; i++) {
    newIds.push(objs[i].id)
  }
  let ids = realtimeDB.ref(roomId).child('objectIds')
  ids
    .get()
    .then(function(snapshot) {
      if (snapshot.exists()) {
        ids.set(newIds)
      }
    })
    .catch(function(error) {
      console.error(error)
    })
}

//EMITTERS

export const sendMessage = data => {
  socket.emit('message', data)
  const user = data.user || 'none'
  const room = data.room
  const sendData = {msg: data.msg, user: user, room: room, id: data.id}
  // update realtimeDB with the new message
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
  socket.emit('object-modified', objWithId)
  // update realtimeDB with updated canvas
  updateRoomCanvas(roomId, objWithId.obj.canvas)
}

// here we emit object added socket and send back object newly added
export const emitAddedToCanvas = objectAdded => {
  socket.emit('object added', objectAdded)
  // update realtimeDB with updated canvas
  if (objectAdded.obj.stroke) {
    objectAdded.obj.fillRule = null
    objectAdded.obj.paintFirst = 'stroke'
  }
  console.log(
    'canvas objects in emitAddedToCanvas =>',
    objectAdded.obj.canvas._objects
  )

  updateRoomCanvas(objectAdded.room, objectAdded.obj.canvas)
  // update realtimeDB with new object's id
  updateObjIds(objectAdded.room, objectAdded.id)
}

export const emitCanvasRemoveChange = objectRemoved => {
  socket.emit('object removed', objectRemoved)
  // update realtimeDB with updated canvas
  updateRoomCanvas(objectRemoved.room, objectRemoved.obj.canvas)
  // remove obj id from array in DB
  removeObjId(objectRemoved.room, objectRemoved.obj.id)
}

export const emitIndexChange = objectWithZChange => {
  socket.emit('index modification', objectWithZChange)
  updateRoomCanvas(objectWithZChange.room, objectWithZChange.obj.canvas)
  updateObjIdxs(objectWithZChange.room, objectWithZChange.obj.canvas)
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

export const modifyIndex = canvas => {
  socket.on('index change', data => {
    const {id, newIndex} = data
    canvas.getObjects().forEach(object => {
      if (object.id === id) {
        canvas.moveTo(object, newIndex)
        canvas.requestRenderAll()
      }
    })
  })
}

// here we listen to canvas add change
// we turn it off (socket.off) to remove duplicates
// we extract obj and id from data
// data => options.target (obj) and options.target.id (id)
// we define empty object that will be filled with the if that runs
// had to be hard coded in this particular way
// because the other ways i tried to add the new object with
// were giving me back the object but transparent
// and also it was messing up with the images (sending a transparent image doble)
// so, depending on the type of the object that the second user receives
// this is the same object that will send back
// with the same specifications that we created them in fabric utils
// we then change the emiting to false to not trigger another add
// change the object and insert that into the other users canvas
// the else is to take the case of the images because they have a DB id
// to be able to sync the drawing we use the path object and sent back the
// coordinates of the object that the user that drew emits
// so we can give that back to the second user
// if not done this way the only way two users could see the same
// was if both users added the same thing individually

export const receiveAddedObject = canvas => {
  socket.off('canvas add change')
  socket.on('canvas add change', data => {
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
        top: obj.top,
        fill: obj.fill,
        fontFamily: obj.fontFamily
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
      object = new fabric.Image(image, obj)
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
    addToCanvas(canvas, image, true, roomId)
  })
}
//user tried to join a full room => is routed back to home
export const receiveFullRoom = () => {
  socket.off('full room')
  socket.on('full room', () => {
    history.push('/join')
    toast(
      'Room is full... Please create a new room or join a different one. <3'
    )
  })
}
//user tried to join a nonexistent room => is routed back to home
export const receiveNoRoom = () => {
  socket.off('no room')
  socket.on('no room', () => {
    history.push('/join')
    toast(
      'The room does not exist... Please create a new room or join an existing one. <3'
    )
  })
}
//user tried to create existing room => is routed back to home
export const receiveExistingRoom = () => {
  socket.off('existing room')
  socket.on('existing room', () => {
    history.push('/join')
    toast(
      'The room already exists... Please join the room or create a room with a new name. <3'
    )
  })
}

//user successfully joins room => is routed to room
export const joinSuccess = dispatch => {
  socket.off('join successful')
  socket.on('join successful', roomId => {
    dispatch(setCurrentRoom(roomId))
    history.push(`/room/${roomId}`)
    toast(`Joined room ${roomId}`)
  })
}

//user successfully creates room => is routed to room
export const createSuccess = dispatch => {
  socket.off('create successful')
  socket.on('create successful', roomId => {
    dispatch(setCurrentRoom(roomId))
    history.push(`/room/${roomId}`)
    realtimeDB.ref(roomId).set({
      canvas: '',
      messages: [],
      users: ['user name here']
    })
    toast(`Created room ${roomId}`)
  })
}

export default socket
