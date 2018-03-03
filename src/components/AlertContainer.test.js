import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import Alert from 'components/Alert';
import AlertContainer from 'components/AlertContainer';
import React from 'react';

describe('AlertContainer', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly with default props', () => {
    const component = mount(
      <AlertContainer>
        <li>An alert</li>
      </AlertContainer>
    );

    expect(component.find('ul').hasClass('alerts')).to.be.true();
  });

  it('should allow custom class names', () => {
    const component = mount(
      <AlertContainer className="my-custom-class">
        <Alert severity="warning" showIcon>Pay attention!</Alert>
      </AlertContainer>
    );

    expect(component.find('ul').hasClass('alerts')).to.be.true();
  });
});
