import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {saveCanvas} from '../store'
import {showToast} from '../toasty'

const SaveForm = props => {
  const [title, setTitle] = useState('')
  const [artists, setArtists] = useState([])
  const canvas = props.canvas
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    if (!title) {
      setTitle('untitled')
    }
    if (!artists.length) {
      setArtists(['anonymous'])
    }

    dispatch(saveCanvas(canvas, title, artists))
  }

  const createNewElement = () => {
    var newInput = document.createElement('div')
    newInput.innerHTML = `<input
          type="artists"
          placeholder="artist"
          name="artists"
          value=${artists}
          onChange=${e => setArtists(artists => [...artists, e.target.value])}
        />`
    document.getElementById('save-form').appendChild(newInput)
  }

  function handleAdd() {
    const values = [...artists]
    //artists.push('');
    setArtists(values)
  }

  function handleRemove(i) {
    const values = [...fields]
    values.splice(i, 1)
    setFields(values)
  }

  return (
    <div className="column">
      <button onClick={props.toggleSaveForm}>x</button>
      <form id="save-form" onSubmit={handleSubmit}>
        <h2>Save Canvas</h2>
        <input
          type="title"
          placeholder="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />
        <input
          type="artists"
          placeholder="artist"
          name="artists"
          value={artists}
          onChange={e => setArtists(e.target.value)}
        />
        <br />
        <button className="add-artist" type="button" onClick={createNewElement}>
          Add an artist
        </button>
        <button className="save-btn" type="submit">
          Save to Gallery
        </button>
      </form>
    </div>
  )
}

export default SaveForm
