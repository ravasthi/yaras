import 'app.css';

import {
  combineReducers,
  createStore,
} from 'redux';
import {
  Link,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { settingsReducer } from 'reducers/settings';

import FontWeightTester from 'components/FontWeightTester';
import Home from 'components/Home';
import logo from 'images/logo.svg';
import React, { Component } from 'react';
import TypefaceTester from 'components/TypefaceTester';

const reducer = combineReducers({
  settings: settingsReducer,
});

const store = createStore(reducer, {});

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="page">
            <div className="primary-nav-container">
              <nav className="primary">
                <Link className="logo-container" to="/">
                  <img className="logo" src={logo} alt="logo" />
                </Link>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/font-weight-tester">Font weight tester</Link></li>
                  <li><Link to="/typeface-tester">Typeface tester</Link></li>
                </ul>
              </nav>
            </div>
            <div className="page-content-container">
              <div className="page-content">
                <Route exact path="/" component={Home} />
                <Route path="/font-weight-tester" component={FontWeightTester} />
                <Route path="/typeface-tester" component={TypefaceTester} />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
