import { render } from '@testing-library/react';

import ColorSwatch from 'app/components/ColorSwatch';
import React from 'react';

describe('ColorSwatch', () => {
  it('renders properly with default props', () => {
    const { container } = render(<ColorSwatch />);
    const swatchStyle = window.getComputedStyle(
      container.querySelector('.swatch')
    );
    const swatchName = container.querySelectorAll('.swatch-name');
    const swatchValue = container.querySelectorAll('.swatch-value');

    expect(container.querySelectorAll('.swatch')).toHaveLength(1);
    expect(swatchName).toHaveLength(1);
    expect(swatchName[0].textContent).toBe('white');
    expect(swatchValue).toHaveLength(1);
    expect(swatchValue[0].textContent).toBe('#ffffff');
    expect(swatchStyle.backgroundColor).toBe('rgb(255, 255, 255)');
    expect(swatchStyle.width).toBe('320px');
    expect(swatchStyle.height).toBe('180px');
  });

  it('should allow custom colors and sizes', () => {
    const { container } = render(
      <ColorSwatch name="dark blue" value="#0f546a" width={200} height={200} />
    );
    const swatchStyle = window.getComputedStyle(
      container.querySelector('.swatch')
    );
    const swatchName = container.querySelector('.swatch-name');
    const swatchValue = container.querySelector('.swatch-value');

    expect(swatchName.textContent).toBe('dark blue');
    expect(swatchValue.textContent).toBe('#0f546a');
    expect(swatchStyle.backgroundColor).toBe('rgb(15, 84, 106)');
    expect(swatchStyle.width).toBe('200px');
    expect(swatchStyle.height).toBe('200px');
  });
});
