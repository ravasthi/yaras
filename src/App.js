import 'app.css';

import { getStore } from 'store';
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import ConnectedFontWeightTester from 'components/ConnectedFontWeightTester';
import ConnectedTypefaceTester from 'components/ConnectedTypefaceTester';
import Home from 'components/Home';
import logo from 'images/logo.svg';
import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={getStore()}>
        <Router>
          <div className="page">
            <div className="primary-nav-container">
              <nav className="primary">
                <Link className="logo-container" to="/">
                  <img className="logo" src={logo} alt="logo" />
                </Link>
                <ul>
                  <li><NavLink exact to="/">Home</NavLink></li>
                  <li><NavLink to="/font-weight-tester">Font weight tester</NavLink></li>
                  <li><NavLink to="/typeface-tester">Typeface tester</NavLink></li>
                </ul>
              </nav>
            </div>
            <div className="page-content-container">
              <div className="page-content">
                <Route exact path="/" component={Home} />
                <Route path="/font-weight-tester" component={ConnectedFontWeightTester} />
                <Route path="/typeface-tester" component={ConnectedTypefaceTester} />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
