import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import TypefaceTester from 'components/TypefaceTester';
import React from 'react';

describe('TypefaceTester', () => {
  let component;

  before(() => {
    initTests();
  });

  beforeEach(() => {
    component = mount(<TypefaceTester />);
  });

  afterEach(() => {
    component.unmount();
  });

  after(() => {
    cleanUpTests();
  });

  it('should render properly with default props', () => {
    expect(component.find('form.settings')).to.have.length(1);
    expect(component.find('select.books')).to.have.length(1);
    expect(component.find('input[type="text"].family')).to.have.length(1);

    expect(component.state('family')).to.equal('Avenir Next');
    expect(component.find('.snippet-content')).to.have.style('font-family', 'Avenir Next');

    expect(component.state('snippet')).to.equal('pride-and-prejudice');
    expect(component.find('.book-title').text()).to.equal('Pride and Prejudice');
  });

  it('should render properly with custom props', () => {
    component = mount(<TypefaceTester family="Helvetica Neue" snippet="picture-of-dorian-gray" />);

    expect(component.state('family')).to.equal('Helvetica Neue');
    expect(component.find('.snippet-content')).to.have.style('font-family', 'Helvetica Neue');

    expect(component.state('snippet')).to.equal('picture-of-dorian-gray');
    expect(component.find('.book-title').text()).to.equal('The Picture of Dorian Gray');
  });

  describe('interactions', () => {
    it('should update properly when a new snippet is chosen', () => {
      const select = component.find('select.books');

      select.node.value = 'scandal-in-bohemia';
      select.simulate('change');

      expect(component.state('snippet')).to.equal('scandal-in-bohemia');
      expect(component.find('.story-title').text()).to.equal('A Scandal in Bohemia');
    });

    it('should update properly when a new font is chosen', () => {
      const input = component.find('input.family');

      input.node.value = 'Georgia';
      component.find('button.update-family').simulate('click');

      expect(component.state('family')).to.equal('Georgia');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Georgia');
    });

    it('should handle extraneous spaces', () => {
      const input = component.find('input.family');

      input.node.value = ' Palatino  ';
      component.find('button.update-family').simulate('click');

      expect(input.node.value).to.equal('Palatino');
      expect(component.state('family')).to.equal('Palatino');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Palatino');
    });

    it('should do nothing if only spaces are entered', () => {
      const input = component.find('input.family');

      input.node.value = '  ';
      component.find('button.update-family').simulate('click');

      expect(input.node.value).to.equal('');
      expect(component.state('family')).to.equal('Avenir Next');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Avenir Next');
    });
  });
});

