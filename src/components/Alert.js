import PropTypes from 'prop-types';
import React from 'react';

function Alert(props) {
  const {
    severity,
    showIcon,
    children,
    className,
  } = props;

  const classNames = `message ${severity} ${className}`;

  let icon;
  if (showIcon) {
    icon = <div className="icon">&nbsp;</div>;
  }

  return (
    <li className={classNames}>
      {icon}
      <div className="message-content">{children}</div>
    </li>
  );
}

Alert.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  severity: PropTypes.oneOf(['error', 'warning', 'success', 'info']),
  showIcon: PropTypes.bool,
};

Alert.defaultProps = {
  className: '',
  severity: 'info',
  showIcon: false,
};

export default Alert;
