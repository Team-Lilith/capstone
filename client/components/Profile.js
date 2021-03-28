import React from 'react'
import {connect} from 'react-redux'

function Profile(props) {
  const user = props.user
  console.log('PROPS FROM PROFILE', props.user)
  return (
    <div id="profile">
      <div id="profile-container">
        <h1>Profile</h1>
        <div>@{user.displayName}</div>
      </div>

      <div id="my-art-container">
        <div>My Art</div>
        <div>(map over my canvases here)</div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Profile)
