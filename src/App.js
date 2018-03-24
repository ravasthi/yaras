import 'app.css';

import { getStore } from 'store';
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

import ConnectedFontWeightTester from 'pages/font-weight-tester/ConnectedFontWeightTester';
import ConnectedTypefaceTester from 'pages/typeface-tester/ConnectedTypefaceTester';
import Home from 'pages/home/Home';
import logo from 'images/logo.svg';
import React, { Component } from 'react';

let persistor;
let store;

function StatelessApp() {
  return (
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
  );
}

/* istanbul ignore next */
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    if (!persistor || !store) {
      const storeObj = getStore();
      /* eslint-disable prefer-destructuring */
      persistor = storeObj.persistor;
      store = storeObj.store;
      /* eslint-enable prefer-destructuring */
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatelessApp />
        </PersistGate>
      </Provider>
    );
  }
}

export {
  App,
  StatelessApp,
};
