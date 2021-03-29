import React, {useState, useEffect} from 'react'
import firebase from 'firebase/app'
import {auth} from '../../server/db'

// Sub-directories can help you organize the components folder

function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [form, setForm] = useState('log-in')

  const onChangeHandler = event => {
    const {name, value} = event.currentTarget
    if (name === 'userEmail') {
      setEmail(value)
    } else if (name === 'userPassword') {
      setPassword(value)
    } else if (name === 'nickname') {
      setNickname(value)
    }
  }

  const toggleForm = () => {
    if (form === 'log-in') {
      setForm('sign-up')
    } else if (form === 'sign-up') {
      setForm('log-in')
    }
  }

  return (
    <div id="auth">
      <div className="mt-8">
        {form === 'log-in' ? <h1>Log In</h1> : <h1>Sign Up</h1>}
        <div>
          <form className="">
            <label htmlFor="userEmail">Email:</label>
            <input
              type="email"
              name="userEmail"
              value={email}
              placeholder="E.g: faruq123@gmail.com"
              id="userEmail"
              onChange={event => onChangeHandler(event)}
            />
            {form === 'sign-up' ? (
              <label htmlFor="nickname">Nickname:</label>
            ) : (
              ''
            )}
            {form === 'sign-up' ? (
              <input
                type="nickname"
                name="nickname"
                value={nickname}
                placeholder="Your Nickname"
                id="nickname"
                onChange={event => onChangeHandler(event)}
              />
            ) : (
              ''
            )}
            <label htmlFor="userPassword">Password:</label>
            <input
              type="password"
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={event => onChangeHandler(event)}
            />
            <br />
            <button type="button">Log in</button>
          </form>

          {form === 'log-in' ? (
            <div>
              <p>or</p>
              <button type="button">Log in with Google</button>
              <p>or</p>
              <button type="button">Log In as Guest</button>
            </div>
          ) : (
            ''
          )}
          <div onClick={toggleForm} id="toggle-form">
            {form === 'log-in' ? <h3>or Sign Up</h3> : <h3>or Log In</h3>}
          </div>
          <div>
            <button>Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
