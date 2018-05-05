import React from 'react';
import PropTypes from 'prop-types';

const ErrorDisplay = props => {
  return (
    <div style={{
      width: 500,
      margin: '200px auto',
      color: 'red',
    }}>
      <p style={{ textAlign: 'center' }}>{props.message}</p>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string,
};

export default ErrorDisplay;
