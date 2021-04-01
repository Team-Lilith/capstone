import React from 'react'
import {useSelector} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  const roomId = useSelector(state => state.room)
  return (
    <div id="all">
      <div>
        <Navbar />
      </div>
      <div>
        <Routes />
      </div>
    </div>
  )
}

export default App
