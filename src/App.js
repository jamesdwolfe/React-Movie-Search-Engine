import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SingleMovie from './pages/SingleMovie'
import Error from './pages/Error'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>
          
          <Route path="/about">
            <About/>
          </Route>
          
          <Route path="/movie/:id">
            <SingleMovie/>
          </Route>

          <Route path="*">
            <Error/>
          </Route>

        </Switch>
      </Router>
    </div>
  )
}

export default App