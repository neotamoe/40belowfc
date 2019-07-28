import React from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import CurrentRoster from './components/CurrentRoster';
import FormerRoster from './components/FormerRoster';
import Stats from './components/Stats';
import Gallery from './components/Gallery';
import Admin from './components/Admin';

function App() {
  return (
    <div>
      <div id="main-heading">
        <img src="/assets/images/ThreeStars.png" alt="team crest"></img>
        <h1 className="App" >40 Below FC</h1>
        <nav>
          <ul className="header">
            <li><NavLink exact={true} to="/">Home</NavLink></li>
            <li><NavLink to="/roster">Current Roster</NavLink></li>
            <li><NavLink to="/roster/former">Former Roster</NavLink></li>
            <li><NavLink to="/stats">Stats</NavLink></li>
            <li><NavLink to="/gallery">Gallery</NavLink></li>
            <li><NavLink to="/admin">Admin</NavLink></li>
          </ul>
        </nav>      
      </div>
      <div className="content">
        <Switch>
          {/* <Route exact path='/' component={Home}/> */}
          <Route path='/roster/former' component={FormerRoster}/>
          <Route path='/roster' component={CurrentRoster}/>
          <Route path='/stats' component={Stats}/>
          <Route path='/gallery' component={Gallery}/>
          <Route path='/admin' component={Admin}/>
        </Switch>
      </div>
      <div style={{border: 'purple 1px solid', marginTop: '250px'}}>
        <h3>TODO LIST: (this will disappear later):</h3>
        <ul>
          <li>form validation</li>
          <li>better arrange form inputs layout</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
