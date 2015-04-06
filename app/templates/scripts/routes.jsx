import React from 'react'
import {Route} from 'react-router'
import Layout from './views/layouts/default'

const routes = (
  <Route name="app" path="/" handler={Layout}>
  </Route>
)

export default routes
