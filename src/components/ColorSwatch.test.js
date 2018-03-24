import {
  cleanUpTests,
  initTests,
} from 'lib/testCommon';
import { mount } from 'enzyme';

import ColorSwatch from 'components/ColorSwatch';
import React from 'react';

describe('ColorSwatch', () => {
  before(() => {
    initTests();
  });

  after(() => {
    cleanUpTests();
  });

  it('renders properly with default props', () => {
    const component = mount(<ColorSwatch />);
    const swatchStyle = component.find('.swatch').getDOMNode().getAttribute('style');
    const swatchName = component.find('.swatch-name');
    const swatchValue = component.find('.swatch-value');

    expect(component.find('.swatch').length).to.equal(1);
    expect(swatchName.length).to.equal(1);
    expect(swatchName.text()).to.equal('white');
    expect(swatchValue.length).to.equal(1);
    expect(swatchValue.text()).to.equal('#ffffff');
    expect(swatchStyle).to.match(/background-color: rgb\(255, 255, 255\)/);
    expect(swatchStyle).to.match(/width: 320px/);
    expect(swatchStyle).to.match(/height: 180px/);
  });

  it('should allow custom colors and sizes', () => {
    const component = mount(
      <ColorSwatch name="dark blue" value="#0f546a" width={200} height={200} />
    );
    const swatchStyle = component.find('.swatch').getDOMNode().getAttribute('style');
    const swatchName = component.find('.swatch-name');
    const swatchValue = component.find('.swatch-value');

    expect(swatchName.text()).to.equal('dark blue');
    expect(swatchValue.text()).to.equal('#0f546a');
    expect(swatchStyle).to.match(/background-color: rgb\(15, 84, 106\)/);
    expect(swatchStyle).to.match(/width: 200px/);
    expect(swatchStyle).to.match(/height: 200px/);
  });
});
