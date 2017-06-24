import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import Home from 'components/Home';
import React from 'react';

describe('Home', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly', () => {
    const component = mount(<Home />);

    expect(component.find('h1').text())
      .to.equal('Yet another React app starter');
  });
});
