import './app.css';

import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="page">
        <div className="primary-nav-container">
          <nav className="primary">
            <ul>
              <li>Page one</li>
              <li>Page two</li>
              <li>Page three</li>
            </ul>
          </nav>
        </div>
        <div className="page-content-container">
          <div className="page-content">
            <div className="app-header">
              <h1>Yet another React app starter</h1>
            </div>
            <p className="app-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
