import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

/**
 * A component to display color swatches. Used for the style guide. This component's code
 * modified from
 * https://github.com/styleguidist/react-styleguidist/issues/779#issuecomment-358180098
 */
class ColorSwatch extends PureComponent {
  render() {
    const {
      name,
      value,
      width,
      height,
    } = this.props;

    const swatchStyle = {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: value,
      display: 'inline-block',
    };

    return (
      <div className="color-swatch-container">
        <div className="swatch" style={swatchStyle}>&nbsp;</div>
        <div className="swatch-name">{name}</div>
        <div className="swatch-value">{value}</div>
      </div>
    );
  }
}

ColorSwatch.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

ColorSwatch.defaultProps = {
  name: 'white',
  value: '#ffffff',
  width: 320,
  height: 180,
};

export default ColorSwatch;
