module.exports = io => {
  io.on('connection', socket => {
    // A client has made a connection to this server
    // "socket" refers to the particular client socket connection
    console.log(`A socket connection to the server has been made: ${socket.id}`)

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
        console.log('room does not existing - creating')
        socket.join(roomId)
        io.to(socket.id).emit('join successful', roomId)
      } else {
        io.to(socket.id).emit('no room')
        console.log(
          `Socket ${
            socket.id
          } is trying to create a room using an existing room id: ${roomId}`
        )
      }
    })

    // when a client emits an 'add-image' event, broadcast it
    socket.on('add-image', data => {
      console.log('broadcasting add-image event')
      socket.broadcast.emit('add-image', data)
    })

    // when the client emits an 'object-modified' event, broadcast a 'new-modification' event to room
    socket.on('object-modified', data => {
      console.log(`an object was modified by socket ${socket.id}`)
      socket.broadcast.emit('new-modification', data)
    })

    // when a client emits a 'message' event, broadcast it
    socket.on('message', msg => {
      socket.to(msg.room).emit('message', msg)
    })

    // When the client disconnects
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
