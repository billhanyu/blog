import React from 'react';
import PropTypes from 'prop-types';

const TimeStamps = props => {
  const { createdAt, updatedAt } = props;
  return (
    <div>
      <p>
        Created At {new Date(createdAt).toLocaleString()}
      </p>
      {
        updatedAt &&
        <p>
          Updated At {new Date(updatedAt).toLocaleString()}
        </p>
      }
    </div>
  );
};

TimeStamps.propTypes = {
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
};

export default TimeStamps;
