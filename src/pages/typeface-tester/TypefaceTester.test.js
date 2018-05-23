import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import React from 'react';
import TypefaceTester from 'pages/typeface-tester/TypefaceTester';

describe('TypefaceTester', () => {
  let component;
  let onUpdateFamilyStub;
  let onUpdateTextStub;
  let sandbox;

  before(() => {
    initTests();
    sandbox = sinon.createSandbox();
    onUpdateFamilyStub = sandbox.stub();
    onUpdateTextStub = sandbox.stub();
  });

  beforeEach(() => {
    component = mount(
      <TypefaceTester
        onUpdateFamily={onUpdateFamilyStub}
        onUpdateText={onUpdateTextStub}
      />
    );
  });

  afterEach(() => {
    component.unmount();
    onUpdateFamilyStub.reset();
    onUpdateTextStub.reset();
  });

  after(() => {
    sandbox.restore();
    cleanUpTests();
  });

  it('should render properly with default props', () => {
    expect(component.find('form.settings')).to.have.length(1);
    expect(component.find('select.books')).to.have.length(1);
    expect(component.find('input[type="text"].family')).to.have.length(1);

    expect(component.state('family')).to.equal('Avenir Next');
    expect(component.find('.family-name')).to.have.text('Avenir Next');
    expect(component.find('.snippet-content')).to.have.style('font-family', 'Avenir Next');

    expect(component.state('snippet')).to.equal('pride-and-prejudice');
    expect(component.find('.book-title').text()).to.equal('Pride and Prejudice');
  });

  it('should render properly with custom props', () => {
    component = mount(<TypefaceTester family="Helvetica Neue" snippet="picture-of-dorian-gray" />);

    expect(component.state('family')).to.equal('Helvetica Neue');
    expect(component.find('.family-name')).to.have.text('Helvetica Neue');
    expect(component.find('.snippet-content')).to.have.style('font-family', 'Helvetica Neue');

    expect(component.state('snippet')).to.equal('picture-of-dorian-gray');
    expect(component.find('.book-title').text()).to.equal('The Picture of Dorian Gray');
  });

  it('should re-render properly when props are updated', () => {
    component.setProps({
      family: 'Helvetica Neue',
      snippet: 'picture-of-dorian-gray',
    });

    expect(component.state('family')).to.equal('Helvetica Neue');
    expect(component.find('.family-name')).to.have.text('Helvetica Neue');
    expect(component.find('.snippet-content')).to.have.style('font-family', 'Helvetica Neue');

    expect(component.state('snippet')).to.equal('picture-of-dorian-gray');
    expect(component.find('.book-title').text()).to.equal('The Picture of Dorian Gray');
  });

  describe('interactions', () => {
    it('should update properly when a new snippet is chosen', () => {
      const select = component.find('select.books');

      select.instance().value = 'scandal-in-bohemia';
      select.simulate('change');

      expect(component.state('snippet')).to.equal('scandal-in-bohemia');
      expect(component.find('.story-title').text()).to.equal('A Scandal in Bohemia');
      expect(onUpdateTextStub.callCount).to.equal(1);
    });

    it('should update properly when a new font is chosen', () => {
      const input = component.find('input.family');

      input.instance().value = 'Georgia';
      component.find('button.update-family').simulate('click');

      expect(component.state('family')).to.equal('Georgia');
      expect(component.find('.family-name')).to.have.text('Georgia');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Georgia');
      expect(onUpdateFamilyStub.callCount).to.equal(1);
    });

    it('should handle an empty input', () => {
      component.find('button.update-family').simulate('click');

      expect(component.state('family')).to.equal('Avenir Next');
      expect(component.find('.family-name')).to.have.text('Avenir Next');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Avenir Next');
    });

    it('should handle extraneous spaces', () => {
      const input = component.find('input.family');

      input.instance().value = ' Palatino  ';
      component.find('button.update-family').simulate('click');

      expect(input.instance().value).to.equal('Palatino');
      expect(component.state('family')).to.equal('Palatino');
      expect(component.find('.family-name')).to.have.text('Palatino');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Palatino');
    });

    it('should do nothing if only spaces are entered', () => {
      const input = component.find('input.family');

      input.instance().value = '  ';
      component.find('button.update-family').simulate('click');

      expect(input.instance().value).to.equal('');
      expect(component.state('family')).to.equal('Avenir Next');
      expect(component.find('.family-name')).to.have.text('Avenir Next');
      expect(component.find('.snippet-content')).to.have.style('font-family', 'Avenir Next');
    });
  });
});

