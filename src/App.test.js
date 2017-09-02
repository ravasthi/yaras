import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import App, { __RewireAPI__ as AppRewireAPI } from 'App';
import React from 'react';

describe('App', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly', () => {
    // eslint-disable-next-line no-underscore-dangle
    AppRewireAPI.__Rewire__(
      'getStore',
      sinon.stub().returns({
        subscribe: () => {},
        dispatch: () => {},
        getState: () => {},
      })
    );

    const app = mount(<App />);

    // eslint-disable-next-line no-underscore-dangle
    AppRewireAPI.__ResetDependency__('getStore');

    expect(app.find('nav.primary')).to.have.length(1);
    expect(app.find('NavLink')).to.have.length(3);
    expect(app.find('Link')).to.have.length(4);
    expect(app.find('Route')).to.have.length(6);
  });
});
