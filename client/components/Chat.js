import React, {useState} from 'react'
import socket from '../socket'
import '../index.css'

export default function Chat(props) {
  const [messages, setMessages] = useState([])
  const userId = 100 // get userId from Auth
  const roomId = props.roomId // user id passed down from room component

  const handleSubmit = e => {
    e.preventDefault()
    //if there's a value in the chat field when submitted
    if (e.target.newMessage.value) {
      // the client emits a 'message' event
      let message = {
        msg: e.target.newMessage.value,
        room: roomId,
        user: userId,
        id: Math.floor(Math.random() * 1000000)
      }
      socket.emit('message', message)
      // and adds message into the messages array on component state
      setMessages([...messages, message])
      e.target.newMessage.value = ''
    }
  }

  // when the server emits a 'message event'
  //add message into the messages array so it will be displayed
  socket.on('message', msg => {
    setMessages([...messages, msg])
  })

  return (
    <div id="chat-container">
      <div>
        <h4>Room: {roomId}</h4>
      </div>
      <div id="display-messages">
        {messages.map(msg => (
          <div key={msg.id}>
            <p>
              User #{msg.user} says: {msg.msg}
            </p>
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={handleSubmit} name="message">
          <div>
            <input name="newMessage" type="text" />
          </div>

          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}