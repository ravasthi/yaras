import { render } from '@testing-library/react';

import Alert from 'app/components/Alert';
import AlertContainer from 'app/components/AlertContainer';
import React from 'react';

describe('AlertContainer', () => {
  it('renders properly with default props', () => {
    const { container } = render(
      <AlertContainer>
        <li>An alert</li>
      </AlertContainer>
    );

    expect(container.querySelector('ul').getAttribute('class')).toMatch(
      'alerts'
    );
  });

  it('should allow custom class names', () => {
    const { container } = render(
      <AlertContainer className="my-custom-class">
        <Alert severity="warning" showIcon>
          Pay attention!
        </Alert>
      </AlertContainer>
    );

    expect(container.querySelector('ul').getAttribute('class')).toMatch(
      'my-custom-class'
    );
  });
});
