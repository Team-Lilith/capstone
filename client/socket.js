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
  console.log('modified', objWithId)
  socket.emit('object-modified', objWithId)
}

// here we emit object added socket and send back object newly added
export const emitAddedToCanvas = objectAdded => {
  console.log('emit object', objectAdded)
  socket.emit('object added', objectAdded)
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
    console.log('receive object', data)
    const {obj, id} = data
    // const object = new fabric.Object()
    // object.set(data)
    // object.emit = false;
    // canvas.add(object)
    // const rect = new fabric.Rect({
    //   height: data.height,
    //   width: data.width,
    //   fill: data.fill,
    // })
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
      console.log('yup', object)
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
    history.push('/')
    console.log('room is full!')
    // toast notification ?
  })
}
//user tried to join a nonexistent room => is routed back to home
export const receiveNoRoom = () => {
  socket.off('no room')
  socket.on('no room', () => {
    history.push('/')
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
    realtimeDB.ref(roomId).set({
      canvas: '',
      messages: [],
      users: ['user name here']
    })
  })
}

export default socket
