import { act, fireEvent, render } from '@testing-library/react';

import React from 'react';
import TypefacePreviewer from 'pages/typeface-previewer/TypefacePreviewer';

describe('TypefacePreviewer', () => {
  let container;
  let mockOnUpdateFamily;
  let mockOnUpdateText;

  beforeAll(() => {
    mockOnUpdateFamily = jest.fn();
    mockOnUpdateText = jest.fn();
  });

  beforeEach(() => {
    container = render(
      <TypefacePreviewer
        onUpdateFamily={mockOnUpdateFamily}
        onUpdateText={mockOnUpdateText}
      />
    ).container;
  });

  afterEach(() => {
    mockOnUpdateFamily.mockClear();
    mockOnUpdateText.mockClear();
  });

  it('should render properly with default props', () => {
    expect(container.querySelectorAll('form.settings')).toHaveLength(1);
    expect(container.querySelectorAll('select.books')).toHaveLength(1);
    expect(
      container.querySelectorAll('input[type="text"].family')
    ).toHaveLength(1);

    expect(container.querySelector('.family-name').textContent).toBe(
      'Avenir Next'
    );

    const style = window.getComputedStyle(
      container.querySelector('.snippet-content')
    );
    expect(style.fontFamily).toBe('Avenir Next');

    expect(container.querySelector('.book-title').textContent).toBe(
      'Pride and Prejudice'
    );
  });

  it('should render properly with custom props', () => {
    container = render(
      <TypefacePreviewer
        family="Helvetica Neue"
        snippetName="picture-of-dorian-gray"
      />
    ).container;

    expect(container.querySelector('.family-name').textContent).toBe(
      'Helvetica Neue'
    );

    const style = window.getComputedStyle(
      container.querySelector('.snippet-content')
    );
    expect(style.fontFamily).toBe('Helvetica Neue');

    expect(container.querySelector('.book-title').textContent).toBe(
      'The Picture of Dorian Gray'
    );
  });

  describe('interactions', () => {
    it('should update properly when a new snippet is chosen', () => {
      const select = container.querySelector('select.books');

      act(() => {
        select.value = 'scandal-in-bohemia';
        fireEvent.change(select);
      });

      expect(container.querySelector('.story-title').textContent).toBe(
        'A Scandal in Bohemia'
      );
      expect(mockOnUpdateText).toHaveBeenCalledTimes(1);
    });

    it('should update properly when a new font is chosen', () => {
      const input = container.querySelector('input.family');

      act(() => {
        input.value = 'Georgia';
        fireEvent.click(container.querySelector('button.update-family'));
      });

      expect(container.querySelector('.family-name').textContent).toBe(
        'Georgia'
      );

      const style = window.getComputedStyle(
        container.querySelector('.snippet-content')
      );
      expect(style.fontFamily).toBe('Georgia');

      expect(mockOnUpdateFamily).toHaveBeenCalledTimes(1);
    });

    it('should handle an empty input', () => {
      act(() => {
        fireEvent.click(container.querySelector('button.update-family'));
      });

      expect(container.querySelector('.family-name').textContent).toBe(
        'Avenir Next'
      );

      const style = window.getComputedStyle(
        container.querySelector('.snippet-content')
      );
      expect(style.fontFamily).toBe('Avenir Next');
    });

    it('should handle extraneous spaces', () => {
      const input = container.querySelector('input.family');

      act(() => {
        input.value = ' Palatino  ';
        fireEvent.click(container.querySelector('button.update-family'));
      });

      expect(input.value).toBe('Palatino');
      expect(container.querySelector('.family-name').textContent).toBe(
        'Palatino'
      );

      const style = window.getComputedStyle(
        container.querySelector('.snippet-content')
      );
      expect(style.fontFamily).toBe('Palatino');
    });

    it('should do nothing if only spaces are entered', () => {
      const input = container.querySelector('input.family');

      act(() => {
        input.value = '  ';
        fireEvent.click(container.querySelector('button.update-family'));
      });

      expect(input.value).toBe('');
      expect(container.querySelector('.family-name').textContent).toBe(
        'Avenir Next'
      );

      const style = window.getComputedStyle(
        container.querySelector('.snippet-content')
      );
      expect(style.fontFamily).toBe('Avenir Next');
    });
  });
});
