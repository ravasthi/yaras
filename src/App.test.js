import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import App from 'App';
import React from 'react';

describe('App', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly', () => {
    const app = mount(<App />);

    expect(app.find('nav.primary')).to.have.length(1);
  });
});
