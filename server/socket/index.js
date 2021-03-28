module.exports = io => {
  io.on('connection', socket => {
    // A client has made a connection to this server
    // "socket" refers to the particular client socket connection
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    function deleteRoom(roomId) {
      console.log('in deleteRoom')
      setTimeout(function() {
        console.log(`deleting room ${roomId}!`)
        // realtimeDB.remove(roomId)
      }, 10000)
    }

    // Each socket can join a room by emitting the room name in a 'join' event
    // The server will listen to the 'join' event and attach that socket to the room
    socket.on('join room', roomId => {
      const room = io.of('/').adapter.rooms.get(roomId)
      console.log('ROOMS => ', io.of('/').adapter.rooms)
      if (room) {
        if (room.size < 2) {
          console.log(`Socket ${socket.id} is joining room ${roomId}`)
          socket.join(roomId)
          io.to(socket.id).emit('join successful', roomId)
        } else {
          console.log('here @ full room')
          io.to(socket.id).emit('full room')
        }
      } else {
        io.to(socket.id).emit('no room')
        console.log(
          `Socket ${socket.id} is trying to join a non existent room: ${roomId}`
        )
      }
    })

    // when a client emits a 'create room' event, join the socket to that room
    socket.on('create room', roomId => {
      const room = io.of('/').adapter.rooms.get(roomId)
      console.log('socket attempting to create room #', roomId)
      if (!room) {
        console.log('room does not exist - creating')
        socket.join(roomId)
        io.to(socket.id).emit('join successful', roomId)
        console.log('next call deleteRoom')
        deleteRoom(roomId)
      } else {
        io.to(socket.id).emit('no room')
        console.log(
          `Socket ${
            socket.id
          } is trying to create a room using an existing room id: ${roomId}`
        )
      }
    })

    socket.on('add-image', data => {
      console.log('server emitting add-image event to room')
      socket.to(data.room).emit('add-image', data)
    })

    socket.on('object added', data => {
      console.log('server emitting object added event to room')
      socket.to(data.room).emit('canvas add change', data)
    })

    socket.on('object-modified', data => {
      console.log('server broadcasting new-modification event')
      socket.broadcast.emit('new-modification', data)
      // socket.to(data.room).emit('add-image', data)
    })

    socket.on('message', msg => {
      console.log('server emitting message event to room')
      socket.to(msg.room).emit('message', msg)
    })

    // When the client disconnects
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
