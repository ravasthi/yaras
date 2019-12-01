import { render } from '@testing-library/react';

import { StatelessApp as App } from 'App';

import React from 'react';

describe('App', () => {
  it('renders properly', () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll('nav.primary')).toHaveLength(1);
    expect(container.querySelectorAll('nav.primary li a')).toHaveLength(3);
  });
});
