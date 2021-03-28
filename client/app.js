import React from 'react'
import {useSelector} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  const roomId = useSelector(state => state.room)
  console.log('app, roomId =>', roomId)
  return (
    <div>
      <Navbar />
      <div id="body">
        <Routes />
      </div>
    </div>
  )
}

export default App
