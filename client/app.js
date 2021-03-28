import React from 'react'
import {useSelector} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  const roomId = useSelector(state => state.room)
  return (
    <div id="body">
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
