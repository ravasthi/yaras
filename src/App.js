import 'app/app.scss';

import storeGetters from 'app/store/index.js';

import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';

// eslint-disable-next-line sort-imports
import ConnectedFontWeightPreviewer from 'app/pages/font-weight-previewer/ConnectedFontWeightPreviewer.js';
import ConnectedTypefacePreviewer from 'app/pages/typeface-previewer/ConnectedTypefacePreviewer.js';
import Home from 'app/pages/home/Home.js';
import logo from 'app/images/logo.svg';
// eslint-disable-next-line sort-imports
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
              <li>
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/font-weight-previewer">
                  Font weight previewer
                </NavLink>
              </li>
              <li>
                <NavLink to="/typeface-previewer">Typeface previewer</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="page-content-container">
          <div className="page-content">
            <Route exact path="/" component={Home} />
            <Route
              path="/font-weight-previewer"
              component={ConnectedFontWeightPreviewer}
            />
            <Route
              path="/typeface-previewer"
              component={ConnectedTypefacePreviewer}
            />
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
      const storeObj = storeGetters.getStore();
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

export { App, StatelessApp };
