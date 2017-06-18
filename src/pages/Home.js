import { getPageTitle } from '../lib/common';

import DocumentTitle from 'react-document-title';
import React from 'react';

function Home() {
  return (
    <div id="home">
      <div className="page-content-header">
        <DocumentTitle title={getPageTitle('Home')}>
          <h1>Yet another React app starter</h1>
        </DocumentTitle>
      </div>
      <div className="module">
        <p>
          This is a React app starter bootstrapped by <a
          href="https://github.com/facebookincubator/create-react-app">Create React App</a>, with
          a few additional conveniences:
        </p>

        <ul>
          <li>A style framework similar to the one in
            <a href="https://github.com/ravasthi/css3-foundation"> css3-foundation</a></li>
          <li>Integration with
            <a href="https://github.com/reacttraining/react-router"> react-router</a></li>
        </ul>

        <p>
          To get started, edit <code>src/Home.js</code> and save to reload.
        </p>
      </div>
    </div>
  );
}

export default Home;
