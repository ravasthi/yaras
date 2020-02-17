import { render } from '@testing-library/react';

import Alert from './Alert';
import React from 'react';

describe('Alert', () => {
  it('renders properly with default props', () => {
    const { container } = render(<Alert>This is my awesome message.</Alert>);
    const messageContent = container.querySelectorAll('.message-content');

    expect(container.querySelector('li').getAttribute('class')).toMatch('info');
    expect(container.querySelectorAll('.icon')).toHaveLength(0);
    expect(messageContent).toHaveLength(1);
    expect(messageContent[0].textContent).toBe('This is my awesome message.');
  });

  it('should show the desired severity', () => {
    const { container } = render(
      <Alert severity="warning">Pay attention!</Alert>
    );

    expect(container.querySelector('li').getAttribute('class')).toMatch(
      'warning'
    );
    expect(container.querySelector('.message-content').textContent).toBe(
      'Pay attention!'
    );
  });

  it('should allow custom class names', () => {
    const { container } = render(
      <Alert severity="warning" className="my-custom-class">
        Pay attention!
      </Alert>
    );

    expect(container.querySelector('li').getAttribute('class')).toMatch(
      'my-custom-class'
    );
  });

  it('should show an icon when the showIcon prop is set', () => {
    const { container } = render(
      <Alert severity="warning" showIcon>
        Pay attention!
      </Alert>
    );

    expect(container.querySelector('li').getAttribute('class')).toMatch(
      'warning'
    );
    expect(container.querySelectorAll('.icon')).toHaveLength(1);
    expect(container.querySelectorAll('.icon svg')).toHaveLength(1);
    expect(container.querySelector('.message-content').textContent).toBe(
      'Pay attention!'
    );
  });

  describe('severities', () => {
    it('should show the right icon for informational messages', () => {
      const { container } = render(
        <Alert severity="info" showIcon>
          The system will be under maintenance from 12am to 1am.
        </Alert>
      );

      expect(
        container.querySelector('.icon svg').getAttribute('class')
      ).toMatch('fa-info-circle');
    });

    it('should show the right icon for success messages', () => {
      const { container } = render(
        <Alert severity="success" showIcon>
          Your request was submitted.
        </Alert>
      );

      expect(
        container.querySelector('.icon svg').getAttribute('class')
      ).toMatch('fa-check');
    });

    it('should show the right icon for warning messages', () => {
      const { container } = render(
        <Alert severity="warning" showIcon>
          Pay attention!
        </Alert>
      );

      expect(
        container.querySelector('.icon svg').getAttribute('class')
      ).toMatch('fa-asterisk');
    });

    it('should show the right icon for error messages', () => {
      const { container } = render(
        <Alert severity="error" showIcon>
          Uh oh.
        </Alert>
      );

      expect(
        container.querySelector('.icon svg').getAttribute('class')
      ).toMatch('fa-exclamation-triangle');
    });
  });
});
