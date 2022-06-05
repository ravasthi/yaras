import { render } from '@testing-library/react';

import Home from 'app/pages/home/Home.js';
import React from 'react';

describe('Home', () => {
  it('renders properly', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('h1').textContent).toBe(
      'Yet another React app starter'
    );
  });
});
