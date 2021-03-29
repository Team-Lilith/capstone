import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {signInWithGoogle} from '../../server/db/firebase'
import {getUser} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const Guest = () => {
  const [nickname, setNickname] = useState('')

  const dispatch = useDispatch()

  // consider refactoring to use async / await
  const loginGuest = ({nickname}) => {
    console.log('logging in guest')
    console.log(nickname)
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
        dispatch(getUser(res.user))
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
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!nickname) {
      return toast.error('Please enter a nickname')
    }

    const data = {nickname}
    loginGuest(data)
  }

  return (
    <div className="column">
      <form onSubmit={handleSubmit}>
        <h2>Continue as Guest</h2>
        <input
          type="nickname"
          placeholder="Nickname"
          name="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />

        <button className="login-btn" type="submit">
          Let's Go!
        </button>
      </form>
    </div>
  )
}

export default Guest
