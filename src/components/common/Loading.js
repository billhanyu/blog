import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => {
  return (
    <div style={{ width: 60, margin: '200px auto' }}>
      <CircularProgress size={60} thickness={7} />
    </div>
  );
};

export default Loading;
