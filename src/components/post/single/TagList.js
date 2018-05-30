import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class TagList extends Component {
  render() {
    return (
      <span>
        {
          this.props.tagList.map((tag, index) => {
            return (
              <a
                style={{marginRight: 20}}
                key={index}
                href='javascript:void(0)'
                onClick={() => {
                  this.props.history.push(`/?tags=${tag}`);
                }}
              >
                {tag}
              </a>
            );
          })
        }
      </span>
    );
  }
}

TagList.propTypes = {
  tagList: PropTypes.array,
  history: PropTypes.object,
};

export default withRouter(TagList);
