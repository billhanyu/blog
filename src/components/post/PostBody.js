import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const PostBody = props => {
  return (
    <ReactMarkdown source={props.body} />
  );
};

PostBody.propTypes = {
  body: PropTypes.string,
};

export default PostBody;
