import io from 'socket.io-client'

const socket = io(window.location.origin)

// ADDING ROOMS =>

// declare socket as a variable, but only initialize it in a function
// this way the client can control when to make the connection and a room is not created right away
// let socket;

// when the socket connection is created, the client will emit an event to join a room
// export const initiateSocket = (room) => {
//   socket = io(window.location.origin);
//   console.log(`Connecting socket...`);
//   if (socket && room) socket.emit('join', room);
// }

// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if(socket) socket.disconnect();
// }

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
