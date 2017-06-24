import 'app.css';

import {
  Link,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import FontWeightTester from 'components/FontWeightTester';
import Home from 'components/Home';
import React, { Component } from 'react';
import TypefaceTester from 'components/TypefaceTester';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <div className="primary-nav-container">
            <nav className="primary">
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
    );
  }
}

export default App;
