module.exports = io => {
  io.on('connection', socket => {
    // A client has made a connection to this server
    // "socket" refers to the particular client socket connection
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // When the client disconnects
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    // Each socket can join a room by emitting the room name in a 'join' event
    // The server will listen to the 'join' event and attach that socket to the room
    socket.on('join', room => {
      console.log(`Socket ${socket.id} joining ${room}`)
      socket.join(room)
    })

    // when a client emits an 'add-image' event, broadcast it
    socket.on('add-image', data => {
      socket.broadcast.emit('add-image', data)
    })

    // when a client emits a 'message' event, broadcast it
    socket.on('message', msg => {
      socket.broadcast.emit('message', msg)
    })
  })
}
