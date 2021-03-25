import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {sendMessage, receiveMessageAndUpdateState} from '../socket'
import {getUser} from '../store'
import '../index.css'

export default function Chat(props) {
  const [messages, setMessages] = useState([])
  // const userId = 100 // get userId from Auth
  const roomId = props.roomId // user id passed down from room component
  const userId = useSelector(state => state.user)
  const dispatch = useDispatch()
  console.log('user info', userId)

  useEffect(() => {}, [userId])

  const handleSubmit = e => {
    e.preventDefault()
    //if there's a value in the chat field when submitted
    if (e.target.newMessage.value) {
      // the client emits a 'message' event
      let message = {
        msg: e.target.newMessage.value,
        room: roomId,
        user: userId.displayName,
        id: Math.floor(Math.random() * 1000000)
      }
      sendMessage(message)
      // and adds message into the messages array on component state
      setMessages([...messages, message])
      e.target.newMessage.value = ''
    }
  }
  //memory leak?
  receiveMessageAndUpdateState(setMessages, messages)

  return (
    <div id="chat-container">
      <div>
        <h4>Room: {roomId}</h4>
      </div>
      <div id="display-messages">
        {messages.map(msg => (
          <div key={msg.id}>
            <p>
              User {msg.user} says: {msg.msg}
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
