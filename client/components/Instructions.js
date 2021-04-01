import React from 'react'

function Instructions(props) {
  const canvas = props.canvas
  const roomId = useSelector(state => state.room)

  return (
    <div>
      <h3>Room Guide</h3>
      <div>
        <li>
          🎨Create a room by entering a room name of preference or just clicking
          the `start a new room` button
        </li>
        <li>
          🎨If a friend already created a room, enter the room name and click
          the `join an existing room` button
        </li>
        <li>
          🎨If that seems like a lot of hassle, just create a room and share
          your link
        </li>
        <li>Note: Each room has a limit of two users per session.</li>
      </div>
    </div>
  )
}

export default Instructions
