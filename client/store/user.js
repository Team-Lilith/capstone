import axios from 'axios'
import firestore from 'firebase'
import {google} from '../../server/db/firebase'
import history from '../history'
import {showToast} from '../toasty'
/**
 * ACTION TYPES
 */
const SET_USER = 'SET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const setUser = user => ({type: SET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const loginGuest = ({nickname}) => dispatch => {
  firestore
    .auth()
    .signInAnonymously()
    .then(res => {
      res.user
        .updateProfile({
          displayName: nickname
        })
        .catch(function(error) {
          console.log(error)
        })
      history.push('/join')
      dispatch(setUser(res.user))
      showToast(`Welcome 💖 \nEnter a room name to start Collaballaging!`)
    })
    .catch(err => {
      console.log('error: ', err)
      showToast(
        'We are having trouble signing you in as a guest 😿 \nPlease try logging in or signing up instead.'
      )
    })
}

export const registerUser = ({nickname, email, password}) => dispatch => {
  firestore
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      res.user.updateProfile({
        displayName: nickname
      })
      showToast('Hello!')
      history.push('/join')
      showToast(
        `Welcome ${
          res.user.displayName
        } 💖 \nEnter a room name to start Collaballaging!`
      )
      dispatch(setUser(res.user))
    })
    .catch(err => {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        showToast(
          'This email is already in use! Please login or continue with a different email.'
        )
      } else if (err.code === 'auth/invalid-email') {
        showToast(
          'Invalid email address. Please make sure you have filled out the form correctly.'
        )
      } else {
        showToast(
          'We are having trouble registering you 😿 \n Please make sure you have filled out the form correctly.'
        )
      }
    })
}

export const loginUser = ({email, password}) => dispatch => {
  firestore
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      history.push('/join')
      dispatch(setUser(res.user))
      showToast(
        `Welcome ${
          res.user.displayName
        } 💖 \nEnter a room name to start Collaballaging!`
      )
    })
    .catch(err => {
      console.log('Error logging in user...', err)
      if (err.code === 'auth/wrong-password') {
        showToast('Email or password is incorrect 😿')
      } else if (err.code === 'auth/user-not-found') {
        showToast('No user associated with that email 😿')
      } else {
        showToast(
          'Something went wrong and we could not log you in 😿\n Please try again.'
        )
      }
    })
}

export const signInWithGoogle = () => dispatch => {
  firestore
    .auth()
    .signInWithPopup(google)
    .then(res => {
      history.push('/join')
      dispatch(setUser(res.user))
      showToast(
        `Welcome ${
          res.user.displayName
        } 💖 \n Enter a room name to start Collaballaging!`
      )
    })
    .catch(err => {
      console.log(err)
      if (err.code === 'auth/wrong-password') {
        showToast('Email or password is incorrect 😿')
      } else if (err.code === 'auth/user-not-found') {
        showToast('Email or password is invalid 😿')
      } else {
        showToast('Something went wrong 😿')
      }
    })
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(setUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(setUser({error: authError}))
  }

  try {
    dispatch(setUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
