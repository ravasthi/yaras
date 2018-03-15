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
    expect(component.find('.icon svg').length).to.equal(1);
    expect(component.find('.message-content').text()).to.equal('Pay attention!');
  });

  describe('severities', () => {
    it('should show the right icon for informational messages', () => {
      const component = mount(
        <Alert severity="info" showIcon>
          The system will be under maintenance from 12am to 1am.
        </Alert>
      );

      expect(component.find('.icon svg').hasClass('fa-info-circle')).to.be.true();
    });

    it('should show the right icon for success messages', () => {
      const component = mount(
        <Alert severity="success" showIcon>
          Your request was submitted.
        </Alert>
      );

      expect(component.find('.icon svg').hasClass('fa-check')).to.be.true();
    });

    it('should show the right icon for warning messages', () => {
      const component = mount(<Alert severity="warning" showIcon>Pay attention!</Alert>);

      expect(component.find('.icon svg').hasClass('fa-asterisk')).to.be.true();
    });

    it('should show the right icon for error messages', () => {
      const component = mount(<Alert severity="error" showIcon>Uh oh.</Alert>);

      expect(component.find('.icon svg').hasClass('fa-exclamation-triangle')).to.be.true();
    });

  });
});
