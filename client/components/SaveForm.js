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

  const addArtist = () => {
    setArtists([...artists, ''])
  }

  const handleArtistChange = e => {
    console.log(e.target.value, 'value')
    console.log(e.target, 'target in change')
    const updatedArtists = [...artists]
    updatedArtists[Number(e.target.idx)] = e.target.value
    console.log('updated artists', updatedArtists)
    setArtists(updatedArtists)
  }

  return (
    <div className="column">
      <button onClick={props.toggleSaveForm}>x</button>
      <form id="save-form" onSubmit={handleSubmit}>
        <h2>Save Canvas</h2>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <br />

        <button className="add-artist" type="button" onClick={addArtist}>
          Add an artist
        </button>
        {artists.map((artist, idx) => {
          console.log(artists[idx], 'artist index')
          console.log(idx, 'index')
          let artistId = `artist-${artist}`
          return (
            <div>
              <input
                type="text"
                placeholder="artist name"
                name={artistId}
                idx={idx}
                id={artistId}
                value={artists[idx]}
                onChange={handleArtistChange}
              />
              <br />
            </div>
          )
        })}
        <button className="save-btn" type="submit">
          Save to Gallery
        </button>
      </form>
    </div>
  )
}

export default SaveForm
