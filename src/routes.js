import React from 'react'
import { Route, IndexRoute, Link, Redirect } from 'react-router'

//COMPONENT
import IndexComponent from './components/index'
import ContentComponent from './components/content'

//END COMPONENT

//HOC
import requireFirebase from './hoc/requireFirebase'
//END HOC

const routes = (
  <Route path="/" component={requireFirebase(IndexComponent)}>
    <IndexRoute component={ContentComponent} />
  </Route>
)

export default routes