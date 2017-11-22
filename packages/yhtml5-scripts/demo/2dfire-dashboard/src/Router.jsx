import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import Provider from 'react-redux/es/components/Provider'
import { store, history } from './redux/store'
import { LazilyLoadComponent } from './Components/LazilyLoad/index.jsx'
import { routeChange } from './Containers/App/route'
import Layout from './Containers/Layout/index.jsx'

/**
 *
 * Todo
 * 1.import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
 *
 *
 */

// ==== lazy load route components ====

// const Layout = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Layout/index.jsx').default, 'container-Layout'))
const Login = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Login/index.jsx').default, 'route-Login'))
const Demo = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Demo/index.jsx').default, 'route-Demo'))
const Document = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Document/index.jsx').default, 'route-Document'))
const Form = () => LazilyLoadComponent(require.ensure([], require => require('./Containers/Form/index.jsx').default, 'route-Form'))

const NoMatch = () => (
  <div>
    <h3>404</h3>
  </div>
)

function newRouter() {
  routeChange(store, history)
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} exact />
          <Layout>
            <Route path="/form" component={Form} />
            {/* </Layout> */}
            {/* <Layout> */}
            <Route path="/demo" component={Demo} />
            {/* </Layout> */}
            {/* <Layout> */}
            <Route path="/document" component={Document} />
            {/* </Layout> */}
            {/* <Layout> */}
            <Route component={NoMatch} exact />
          </Layout>
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default newRouter
