import React from 'react';
import { Route } from "react-router-dom";

import './App.css';

import Nav from './components/Nav.js';
import Form from './components/Form.js';
import Login from './components/Login.js';
import Jokes from './components/Jokes.js'
import PrivateRoute from './components/PrivateRoute.js';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Route path="/register">
     <Form/>
     </Route>
     <Route path="/login">
      <Login/>
     </Route>
     <PrivateRoute path='/jokes' component={Jokes} />
    </div>
  );
}

export default App;
