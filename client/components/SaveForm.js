import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {saveCanvas} from '../store'
import {showToast} from '../toasty'

const SaveForm = props => {
  const [title, setTitle] = useState('')
  const [artists, setArtists] = useState([''])
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

  const addArtist = () => {
    setArtists([...artists, ''])
  }

  const handleArtistChange = e => {
    let idx = Number(e.target.name)
    const updatedArtists = [...artists]
    updatedArtists[idx] = e.target.value
    console.log('updated artists', updatedArtists)
    setArtists(updatedArtists)
  }

  return (
    <div className="column">
      <button id="x-button" onClick={props.toggleSaveForm}>
        x
      </button>
      <form id="save-form" onSubmit={handleSubmit}>
        <h2>Save Canvas</h2>
        <div id="save-inputs">
          <input
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <br />

          {artists.map((artist, idx) => {
            return (
              <div key={idx}>
                <input
                  type="text"
                  placeholder="artist name"
                  name={idx}
                  value={artists[idx]}
                  onChange={handleArtistChange}
                />
                <br />
              </div>
            )
          })}
        </div>
        <div id="save-buttons">
          <button className="add-artist" type="button" onClick={addArtist}>
            Add Artist
          </button>
          <button className="save-btn" type="submit">
            Save to Gallery
          </button>
        </div>
      </form>
    </div>
  )
}

export default SaveForm
