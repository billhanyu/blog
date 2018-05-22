import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class PostBody extends Component {
  componentDidMount() {
    const images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.style.maxWidth = '100%';
    }
  }

  render() {
    return (
      <ReactMarkdown source={this.props.body} />
    );
  }
}

PostBody.propTypes = {
  body: PropTypes.string,
};

export default PostBody;
