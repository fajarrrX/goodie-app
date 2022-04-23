import React, { Component } from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import OutletList from './components/OutletList'
import Nav from './components/Nav'
import AddForm from './components/AddForm'

export default class App extends Component {
    render() {
        return (
          <div>
              <div className="App">
                <BrowserRouter>
                  <Nav />
                  <Switch>               
                  <Route path='/' exact component={Login} />
                  <Route path='/register' component={Register} />
                  <Route path='/add' component={AddForm} />
                  <Route path='/dashboard' component={OutletList} />
                  </Switch>
                </BrowserRouter>
              </div>
          </div>
        )
    }
}

