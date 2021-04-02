import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  withRouter,
  Route,
  Switch
} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Register,
  Room,
  Join,
  Home,
  Gallery,
  Profile,
  HomeSignUp,
  SingleCanvas
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/room/:id">
          <Room />
        </Route>
        <Route path="/join" component={Join} />
        <Route exact path="/gallery" component={Gallery} />
        <Route path="/gallery/:id" component={SingleCanvas} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={HomeSignUp} />
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
