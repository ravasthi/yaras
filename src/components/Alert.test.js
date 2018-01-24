import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import Alert from 'components/Alert';
import React from 'react';

describe('Alert', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly with default props', () => {
    const component = mount(<Alert>This is my awesome message.</Alert>);

    expect(component.find('li').hasClass('info')).to.be.true();
    expect(component.find('.icon').length).to.equal(0);
    expect(component.find('.message-content').length).to.equal(1);
    expect(component.find('.message-content').text()).to.equal('This is my awesome message.');
  });

  it('should show the desired severity', () => {
    const component = mount(<Alert severity="warning">Pay attention!</Alert>);

    expect(component.find('li').hasClass('warning')).to.be.true();
    expect(component.find('.message-content').text()).to.equal('Pay attention!');
  });

  it('should allow custom class names', () => {
    const component = mount(
      <Alert severity="warning" className="my-custom-class">Pay attention!</Alert>
    );

    expect(component.find('li').hasClass('my-custom-class')).to.be.true();
  });

  it('should show an icon when the showIcon prop is set', () => {
    const component = mount(<Alert severity="warning" showIcon>Pay attention!</Alert>);

    expect(component.find('li').hasClass('warning')).to.be.true();
    expect(component.find('.icon').length).to.equal(1);
    expect(component.find('.message-content').text()).to.equal('Pay attention!');
  });
});
