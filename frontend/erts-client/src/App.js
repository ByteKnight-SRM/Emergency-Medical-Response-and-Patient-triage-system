/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/


// src/App.js
import React from 'react';
import Map from './components/Map';
import AmbulanceTracker from './components/AmbulanceTracker';
import IncidentForm from './components/IncidentForm';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <h1>Emergency Response and Triage System</h1>
      <IncidentForm />
      <AmbulanceTracker />
      <Map />
      <Dashboard />
    </div>
  );
}

export default App;



