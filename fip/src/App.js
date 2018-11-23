import React, { Component } from 'react';
// import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';
// import { Hello } from './components/hello';
import Home from './components/home';
// import About from './components/about';
import Login  from './components/login';
import Register  from './components/register';
import Profile  from './components/profile';

import {Navbar} from './components/navbar';
class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
      <div>
    
      <div className="App">
       <Navbar />
      
        </div>
        <div>      
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/profile" component={Profile} exact/>
  </div>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;
