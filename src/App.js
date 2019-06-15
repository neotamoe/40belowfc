import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <div className="App">
        <img src="/assets/images/crest2stars.png" alt="team crest"></img>
        <h1>40 Below FC</h1>
      </div>

      <ul className="header">
        <li><a href="/">Home</a></li>
        <li><a href="/stuff">Stuff</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="content" style={{border: 'blue 1px solid'}}>
          <p>Content to go here</p>
      </div>
      <div style={{border: 'purple 1px solid', marginTop: '50px'}}>
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
