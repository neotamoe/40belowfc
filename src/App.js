import React from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import CurrentRoster from './components/CurrentRoster';
import FormerRoster from './components/FormerRoster';
import Stats from './Stats';

function App() {
  return (
    <div>
      <div id="main-heading">
        <img src="/assets/images/crest2stars.png" alt="team crest"></img>
        <h1 className="App" >40 Below FC</h1>
        <nav>
          <ul className="header">
            <li><NavLink exact={true} to="/">Home</NavLink></li>
            <li><NavLink to="/roster">Current Roster</NavLink></li>
            <li><NavLink to="/roster/former">Former Roster</NavLink></li>
            <li><NavLink to="/stats">Stats</NavLink></li>
          </ul>
        </nav>      
      </div>
      <div className="content">
        <Switch>
          {/* <Route exact path='/' component={Home}/> */}
          <Route path='/roster/former' component={FormerRoster}/>
          <Route path='/roster' component={CurrentRoster}/>
          <Route path='/stats' component={Stats}/>
        </Switch>
      </div>
      <div style={{border: 'purple 1px solid', marginTop: '250px'}}>
        <h3>PLANNING (this will disappear later):</h3>
        <ul>
          <li>navbar</li>
          <li>current roster</li>
          <li>former roster</li>
          <li>stats</li>
          <li>next game</li>
          <li>photos</li>
          <li>admin page</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
