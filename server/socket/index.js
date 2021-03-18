module.exports = io => {
  const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage'
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('addImage', data => socket.broadcast.emit('addImage', data))

    // Join a conversation
    const {roomId} = socket.handshake.query
    socket.join(roomId)

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, data => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
