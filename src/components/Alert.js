import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PropTypes from 'prop-types';
import React from 'react';

/**
 * An alert message with customizable message and severity. NB: *must* be used inside an
 * `AlertContainer`.
 *
 * @param {any} props
 */
function Alert(props) {
  const {
    severity,
    showIcon,
    children,
    className,
  } = props;

  const classNames = `message ${severity} ${className}`;

  let icon;
  let iconContent;
  if (showIcon) {
    switch (severity) {
    case 'error':
      iconContent = <FontAwesomeIcon icon="exclamation-triangle" />;
      break;
    case 'warning':
      iconContent = <FontAwesomeIcon icon="asterisk" />;
      break;
    case 'success':
      iconContent = <FontAwesomeIcon icon="check" />;
      break;
    case 'info':
    default:
      iconContent = <FontAwesomeIcon icon="info-circle" />;
      break;
    }
    icon = <div className="icon">{iconContent}</div>;
  }

  return (
    <li className={classNames}>
      {icon}
      <div className="message-content">{children}</div>
    </li>
  );
}

Alert.propTypes = {
  /** The content of the alert. Can contain HTML and other components. */
  children: PropTypes.any.isRequired,
  /** Any custom class names to add to the alert. */
  className: PropTypes.string,
  /** The severity of the alert, which governs how it's presented. */
  severity: PropTypes.oneOf(['error', 'warning', 'success', 'info']),
  /** Whether or not to show the default icon matching the severity. */
  showIcon: PropTypes.bool,
};

Alert.defaultProps = {
  className: '',
  severity: 'info',
  showIcon: false,
};

export default Alert;
