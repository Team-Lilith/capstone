import axios from 'axios'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {google} from '../../server/db/firebase'
import history from '../history'
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
export const loginGuest = ({nickname}) => async dispatch => {
  console.log('logging in guest')
  console.log(nickname)
  await firestore
    .auth()
    .setPersistence(firestore.auth.Auth.Persistence.SESSION)
    .then(() => {
      firestore
        .auth()
        .signInAnonymously()
        .then(res => {
          console.log(res.user)
          res.user
            .updateProfile({
              displayName: nickname
            })
            .catch(function(error) {
              // An error happened.
              console.log(error)
            })
          history.push('/join')
          dispatch(setUser(res.user))
        })
        .catch(err => {
          console.log('error', err)
          if (err.code === 'auth/wrong-password') {
            return toast.error('Email or password is incorrect')
          } else if (err.code === 'auth/user-not-found') {
            return toast.error('Email or password is invalid')
          } else {
            return toast.error('Something went wrong')
          }
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const registerWithGoogle = () => async dispatch => {
  await firestore
    .auth()
    .setPersistence(firestore.auth.Auth.Persistence.SESSION)
    .then(() => {
      firestore
        .auth()
        .signInWithPopup(google)
        .then(res => {
          console.log(res.user)
          dispatch(setUser(res.user))
        })
        .catch(err => {
          if (err.code === 'auth/wrong-password') {
            return toast.error('Email or password is incorrect')
          } else if (err.code === 'auth/user-not-found') {
            return toast.error('Email or password is invalid')
          } else {
            return toast.error('Something went wrong')
          }
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const registerUser = ({nickname, email, password}) => async dispatch => {
  console.log('email:', email)
  console.log('pas:', password)

  await firestore
    .auth()
    .setPersistence(firestore.auth.Auth.Persistence.SESSION)
    .then(() => {
      firestore
        .auth()
        .createUserWithEmailAndPassword(email, password)
        //.then((data) => data.json())
        .then(res => {
          res.user
            .updateProfile({
              displayName: nickname
            })
            .then(function() {
              // Update successful.
            })
            .catch(function(error) {
              // An error happened.
              console.log(error)
            })
          history.push('/join')
          dispatch(setUser(res.user))
        })
        .catch(err => {
          console.log(err)
          if (err.code === 'auth/email-already-in-use') {
            return toast.warning(
              'This email is already in use, Please login or continue with another email'
            )
          } else {
            return toast.error('Something went wrong')
          }
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const loginUser = ({email, password}) => async dispatch => {
  console.log('logging in user')
  console.log(email, password)
  let user = {}
  await firestore
    .auth()
    .setPersistence(firestore.auth.Auth.Persistence.SESSION)
    .then(() => {
      firestore
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          user = res.user
          console.log(res.user)
          history.push('/join')
          dispatch(setUser(user))
        })
        .catch(err => {
          //console.log(err)
          if (err.code === 'auth/wrong-password') {
            return toast.error('Email or password is incorrect')
          } else if (err.code === 'auth/user-not-found') {
            return toast.error('Email or password is invalid')
          } else {
            return toast.error('Something went wrong')
          }
        })
    })
    .catch(err => {
      console.log(err)
    })
}

export const signInWithGoogle = () => async dispatch => {
  try {
    await firestore
      .auth()
      .setPersistence(firestore.auth.Auth.Persistence.SESSION)
      .signInWithPopup(google)
      .then(res => {
        console.log(res.user)
        history.push('/join')
        dispatch(setUser(res.user))
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          return toast.error('Email or password is incorrect')
        } else if (err.code === 'auth/user-not-found') {
          return toast.error('Email or password is invalid')
        } else {
          return toast.error('Something went wrong')
        }
      })
  } catch (error) {
    console.log(error)
  }
}

export const me = () => async dispatch => {
  try {
    var user = firestore.auth().currentUser
    console.log('in me', user)

    if (user) {
      console.log('signed in', user)
      dispatch(setUser(user))
      // User is signed in.
    } else {
      console.log('nobody signed in ')
      dispatch(setUser(defaultUser))
      // No user is signed in.
    }
    dispatch(setUser(user))
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
