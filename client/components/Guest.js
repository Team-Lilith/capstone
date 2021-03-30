import React, {useState} from 'react'
import {toast} from 'react-toastify'
import firestore from 'firebase'
import {loginGuest} from '../store'
import {useDispatch} from 'react-redux'

const Guest = () => {
  const [nickname, setNickname] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!nickname) {
      return toast.error('Please enter a nickname')
    }

    const data = {nickname}
    dispatch(loginGuest(data))
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
