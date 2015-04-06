import React from 'react'
import {Grid} from 'react-bootstrap'
import {RouteHandler} from 'react-router'

const App = React.createClass({
  render() {
    return (
      <Grid id="container">
        <RouteHandler />
      </Grid>
    )
  }
})

export default App
