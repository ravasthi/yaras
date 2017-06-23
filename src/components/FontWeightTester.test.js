import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import FontWeightTester from 'components/FontWeightTester';
import React from 'react';

describe('FontWeightTester', () => {
  let component;

  before(() => {
    initTests();
  });

  beforeEach(() => {
    component = mount(<FontWeightTester />);
  });

  afterEach(() => {
    component.unmount();
  });

  after(() => {
    cleanUpTests();
  });

  it('should render properly with default props', () => {
    expect(component.find('form.choose-family')).to.have.length(1);
    expect(component.find('input[type="text"].family')).to.have.length(1);

    expect(component.state('family')).to.equal('Avenir Next');
    expect(component.find('.family-under-test')).to.have.text().equal('Avenir Next');
    expect(component.find('.displayed-font')).to.have.style('font-family', 'Avenir Next');
  });

  it('should render properly with custom props', () => {
    component = mount(<FontWeightTester family="Helvetica Neue" />);

    expect(component.state('family')).to.equal('Helvetica Neue');
    expect(component.find('.family-under-test')).to.have.text().equal('Helvetica Neue');
    expect(component.find('.displayed-font')).to.have.style('font-family', 'Helvetica Neue');
  });

  describe('interactions', () => {
    it('should update properly when a new font is chosen', () => {
      const input = component.find('input.family');

      input.node.value = 'Georgia';
      component.find('form.choose-family').simulate('submit');

      expect(component.state('family')).to.equal('Georgia');
      expect(component.find('.family-under-test')).to.have.text().equal('Georgia');
      expect(component.find('.displayed-font')).to.have.style('font-family', 'Georgia');
    });

    it('should handle extraneous spaces', () => {
      const input = component.find('input.family');

      input.node.value = ' Palatino  ';
      component.find('form.choose-family').simulate('submit');

      expect(input.node.value).to.equal('Palatino');
      expect(component.state('family')).to.equal('Palatino');
      expect(component.find('.family-under-test')).to.have.text().equal('Palatino');
      expect(component.find('.displayed-font')).to.have.style('font-family', 'Palatino');
    });

    it('should do nothing if only spaces are entered', () => {
      const input = component.find('input.family');

      input.node.value = '  ';
      component.find('form.choose-family').simulate('submit');

      expect(input.node.value).to.equal('');
      expect(component.state('family')).to.equal('Avenir Next');
      expect(component.find('.family-under-test')).to.have.text().equal('Avenir Next');
      expect(component.find('.displayed-font')).to.have.style('font-family', 'Avenir Next');

    });
  });
});

