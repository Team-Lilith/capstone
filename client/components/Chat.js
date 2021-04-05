import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {sendMessage, receiveMessageAndUpdateState} from '../socket'
import {getInitialChat} from '../store'
import '../index.css'

export default function Chat(props) {
  const [messages, setMessages] = useState([])
  const roomId = props.roomId
  const userId = useSelector(state => state.user)
  const initialChat = useSelector(state => state.chat)
  const dispatch = useDispatch()

  useEffect(
    () => {
      if (roomId) {
        dispatch(getInitialChat(roomId))
      }
    },
    [roomId]
  )

  useEffect(
    () => {
      if (initialChat.length) {
        setMessages(initialChat)
      }
    },
    [initialChat]
  )

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.newMessage.value) {
      let message = {
        msg: e.target.newMessage.value,
        room: roomId,
        user: userId.displayName,
        id: Math.floor(Math.random() * 1000000)
      }
      sendMessage(message)
      setMessages([...messages, message])
      e.target.newMessage.value = ''
    }
  }
  //memory leak?
  receiveMessageAndUpdateState(setMessages, messages)

  return (
    <div id="chat-container">
      <div>
        <h4>Chat Room</h4>
      </div>
      <div id="display-messages">
        {messages.map(msg => (
          <div key={msg.id}>
            <p className="message-bubble">
              {msg.user ? msg.user : 'Anon'}: {msg.msg}
            </p>
          </div>
        ))}
      </div>

      <div className="message-input">
        <form onSubmit={handleSubmit} name="message">
          <input
            name="newMessage"
            type="text"
            placeholder="Your message here"
          />

          <button className="nav-button" type="submit">
            <h2>Send</h2>
          </button>
        </form>
      </div>
    </div>
  )
}
