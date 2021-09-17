import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute.js';
import BubblePage from './components/BubblePage.js';

import axiosWithAuth from './helpers/axiosWithAuth.js';

import "./styles.scss";

function App() {

  const clickLogout = () => {
    axiosWithAuth().post('/logout')
                   .then(res => {
                         console.log(res)
                         localStorage.removeItem('token');
                   })
                   .catch(err => {
                          console.error('uh-oh, something went wrong', err)})
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/" onClick={clickLogout}>logout</a>
        </header>

        <Switch>
          <Route exact path='/' component={Login}/>

          <Route path='/login' component={Login}/>

          <PrivateRoute path='/bubblepage' component={BubblePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.