import React from 'react'
import '../index.css'

function Instructions(props) {
  return (
    <div id="instructions">
      <h2>Room Guide</h2>
      <div id="instructions-inner">
        <p>
          🎨Create a room by entering a room name of preference or just clicking
          the `start a new room` button
        </p>
        <p>
          🎨If a friend already created a room, enter the room name and click
          the `join an existing room` button
        </p>
        <p>
          🎨If that seems like too much hassle, just create a room and share
          your link
        </p>
        <p>Note: Each room has a limit of two users per session.</p>
      </div>
    </div>
  )
}

export default Instructions
