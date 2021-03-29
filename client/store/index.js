import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import images from './images'
import room from './room'
import gallery from './gallery'
import chat from './chat'
import canvas from './canvas'

const reducer = combineReducers({user, images, room, gallery, chat, canvas})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './images'
export * from './room'
export * from './gallery'
export * from './chat'
export * from './canvas'
