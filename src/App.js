import React from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import CurrentRoster from './components/CurrentRoster';
import FormerRoster from './components/FormerRoster';
import Stats from './Stats';

function App() {
  return (
    <div>
      <div className="App">
        <img src="/assets/images/crest2stars.png" alt="team crest"></img>
        <h1>40 Below FC</h1>
      </div>
      <navbar>
        <ul className="header">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/roster">Current Roster</Link></li>
          <li><Link to="/roster/former">Former Roster</Link></li>
          <li><Link to="/stats">Stats</Link></li>
        </ul>
      </navbar>
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
