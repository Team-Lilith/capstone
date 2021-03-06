module.exports = (io, realtimeDB) => {
  io.on('connection', socket => {
    // A client has made a connection to this server
    // "socket" refers to the particular client socket connection
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // room is deleted from realtimeDB 30min after being created
    function deleteRoom(roomId) {
      setTimeout(function() {
        realtimeDB.ref(roomId).remove()
      }, 1800000)
    }

    // Each socket can join a room by emitting the room name in a 'join' event
    // The server will listen to the 'join' event and attach that socket to the room
    socket.on('join room', roomId => {
      const room = io.of('/').adapter.rooms.get(roomId)
      if (room) {
        if (room.size < 2 || (room.size <= 2 && room.has(socket.id))) {
          if (room.has(socket.id)) {
            console.log('already in room')
          }
          console.log(`Socket ${socket.id} is joining room: ${roomId}`)
          socket.join(roomId)
          io.to(socket.id).emit('join successful', roomId)
        } else {
          const room = io.of('/').adapter.rooms.get(roomId)
          console.log('socket =>', socket.id)
          console.log('trying to join room =>', room)
          io.to(socket.id).emit('full room')
        }
      } else {
        io.to(socket.id).emit('no room')
        console.log('current rooms =>', io.of('/').adapter.rooms)
        console.log(
          `Socket ${socket.id} is trying to join a non existent room: ${roomId}`
        )
      }
    })

    socket.on('rejoin room', roomId => {
      const room = io.of('/').adapter.rooms.get(roomId)
      if (room) {
        if (room.size < 2 || (room.size <= 2 && room.has(socket.id))) {
          if (room.has(socket.id)) {
            console.log('already in room')
          }
          console.log(`Socket ${socket.id} is rejoining room: ${roomId}`)
          socket.join(roomId)
          io.to(socket.id).emit('rejoin successful', roomId)
        } else {
          console.log(`Socket ${socket.id} can't join ${roomId} - room full!`)
          io.to(socket.id).emit('full room')
        }
      } else {
        console.log(`Socket ${socket.id} is rejoining room: ${roomId}`)
        socket.join(roomId)
        io.to(socket.id).emit('rejoin successful', roomId)
      }
    })

    // when a client emits a 'create room' event, join the socket to that room
    socket.on('create room', roomId => {
      const room = io.of('/').adapter.rooms.get(roomId)
      console.log('Socket attempting to create room:', roomId)
      if (!room) {
        console.log('Room does not exist - creating')
        socket.join(roomId)
        io.to(socket.id).emit('create successful', roomId)
        // delete room info from db after 30min
        deleteRoom(roomId)
      } else {
        io.to(socket.id).emit('existing room')
        console.log(
          `Socket ${
            socket.id
          } is trying to create a room using an existing room id: ${roomId}`
        )
      }
    })

    socket.on('add-image', data => {
      socket.to(data.room).emit('add-image', data)
    })

    socket.on('object added', data => {
      console.log('Server emitting object added event to room')
      socket.to(data.room).emit('canvas add change', data)
    })

    socket.on('object-modified', data => {
      console.log('Server broadcasting new-modification event')
      socket.to(data.room).emit('new-modification', data)
    })

    socket.on('object removed', data => {
      socket.to(data.room).emit('canvas remove change', data)
    })

    socket.on('index modification', data => {
      socket.to(data.room).emit('index change', data)
    })

    // when a client emits a 'message' event, broadcast it
    socket.on('message', msg => {
      console.log('Server emitting message event to room')
      socket.to(msg.room).emit('message', msg)
    })

    // When the client disconnects
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
