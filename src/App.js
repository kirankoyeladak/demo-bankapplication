import React from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import './App.css';
import Dashboard from './components/Dashboard';
import UserRegistration from './components/UserRegistration';
import Banktransfer from './components/Banktransfer';
import NewLogin from './components/NewLogin';


function App() {
  return (
    <div className="App">
       {/* <ul>
        <li><NavLink exact to='/'>Home Page</NavLink></li>
        <li><NavLink to='login'>Login Page</NavLink></li>
        <li><NavLink to='register'>Register Page</NavLink></li>
        <li><NavLink to='transfer'>Bank Transfer</NavLink></li>
      </ul> */}
      <Route exact path='/' component={NewLogin}/>
      <Route path='/login' component={NewLogin}/>
      <Route path='/register' component={UserRegistration}/>
      <Route path='/transfer' component={Banktransfer}/>
      <Route path='/dashboard' component={Dashboard}/>
     
    </div>
  );
}

export default App;
