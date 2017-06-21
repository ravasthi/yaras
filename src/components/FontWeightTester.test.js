import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import FontWeightTester from 'components/FontWeightTester';
import React from 'react';

describe('FontWeightTester', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly', () => {
    const app = mount(<FontWeightTester />);

    // expect(app.find('nav.primary')).to.have.length(1);
  });
});

