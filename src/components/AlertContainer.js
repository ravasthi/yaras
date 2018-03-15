import PropTypes from 'prop-types';
import React from 'react';

/**
 * A container for one or more `Alert` components.
 *
 * @param {any} props
 */
function AlertContainer({ children, className }) {
  const classNames = `alerts ${className}`;

  return (
    <ul className={classNames}>
      {children}
    </ul>
  );
}

AlertContainer.propTypes = {
  /** Any number of alerts */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Any custom class names */
  className: PropTypes.string,
};

AlertContainer.defaultProps = {
  className: '',
};

export default AlertContainer;
