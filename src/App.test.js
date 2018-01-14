import { StatelessApp as App } from 'App';
import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import React from 'react';

describe('App', () => {
  let container;

  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  beforeEach(() => {
    container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);
  });

  it('renders properly', () => {
    const app = mount(<App />, { attachTo: container });

    expect(app.find('nav.primary')).to.have.length(1);
    expect(app.find('NavLink')).to.have.length(3);
    expect(app.find('Link')).to.have.length(4);
    expect(app.find('Route')).to.have.length(6);
  });
});
