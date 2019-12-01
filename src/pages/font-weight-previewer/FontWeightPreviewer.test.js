import { act, fireEvent, render } from '@testing-library/react';

import FontWeightPreviewer from 'pages/font-weight-previewer/FontWeightPreviewer';
import React from 'react';

describe('FontWeightPreviewer', () => {
  let container;
  let mockOnUpdateFamily;

  beforeAll(() => {
    mockOnUpdateFamily = jest.fn();
  });

  beforeEach(() => {
    container = render(
      <FontWeightPreviewer onUpdateFamily={mockOnUpdateFamily} />
    ).container;
  });

  afterEach(() => {
    mockOnUpdateFamily.mockClear();
  });

  it('should render properly with default props', () => {
    const input = container.querySelectorAll('input[type="text"].family');

    expect(container.querySelectorAll('form.choose-family')).toHaveLength(1);
    expect(input).toHaveLength(1);

    expect(container.querySelector('.family-under-test').textContent).toBe(
      'Avenir Next'
    );

    const style = window.getComputedStyle(
      container.querySelector('.displayed-font')
    );
    expect(style.fontFamily).toBe('Avenir Next');
  });

  it('should render properly with custom props', () => {
    container = render(<FontWeightPreviewer family="Helvetica Neue" />)
      .container;

    expect(container.querySelector('.family-under-test').textContent).toBe(
      'Helvetica Neue'
    );

    const style = window.getComputedStyle(
      container.querySelector('.displayed-font')
    );
    expect(style.fontFamily).toBe('Helvetica Neue');
  });

  describe('interactions', () => {
    it('should update properly when a new font is chosen', () => {
      const input = container.querySelector('input.family');

      act(() => {
        input.value = 'Georgia';
        fireEvent.click(container.querySelector('form.choose-family button'));
      });

      expect(container.querySelector('.family-under-test').textContent).toBe(
        'Georgia'
      );

      const style = window.getComputedStyle(
        container.querySelector('.displayed-font')
      );
      expect(style.fontFamily).toBe('Georgia');

      expect(mockOnUpdateFamily).toHaveBeenCalledTimes(1);
    });

    it('should handle an empty input', () => {
      act(() => {
        fireEvent.submit(container.querySelector('form.choose-family'));
      });

      expect(container.querySelector('.family-under-test').textContent).toBe(
        'Avenir Next'
      );

      const style = window.getComputedStyle(
        container.querySelector('.displayed-font')
      );
      expect(style.fontFamily).toBe('Avenir Next');
    });

    it('should handle extraneous spaces', () => {
      const input = container.querySelector('input.family');

      act(() => {
        input.value = ' Palatino  ';
        fireEvent.submit(container.querySelector('form.choose-family'));
      });

      expect(input.value).toBe('Palatino');
      expect(container.querySelector('.family-under-test').textContent).toBe(
        'Palatino'
      );

      const style = window.getComputedStyle(
        container.querySelector('.displayed-font')
      );
      expect(style.fontFamily).toBe('Palatino');
    });

    it('should do nothing if only spaces are entered', () => {
      const input = container.querySelector('input.family');

      act(() => {
        input.value = '  ';
        fireEvent.submit(container.querySelector('form.choose-family'));
      });

      expect(input.value).toBe('');
      expect(container.querySelector('.family-under-test').textContent).toBe(
        'Avenir Next'
      );

      const style = window.getComputedStyle(
        container.querySelector('.displayed-font')
      );
      expect(style.fontFamily).toBe('Avenir Next');
    });
  });
});
