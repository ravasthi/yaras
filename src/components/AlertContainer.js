import PropTypes from 'prop-types';
import React from 'react';

function AlertContainer({ children, className }) {
  const classNames = `alerts ${className}`;

  return (
    <ul className={classNames}>
      {children}
    </ul>
  );
}

AlertContainer.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};

AlertContainer.defaultProps = {
  className: '',
};

export default AlertContainer;
