import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class PostCard extends Component {
  render() {
    const {
      title,
      slug,
      body,
      author,
      createdAt,
      updatedAt,
    } = this.props.post;

    return (
      <Card>
        <CardTitle
          onClick={() => {
            this.props.history.push(`/posts/${slug}`);
          }}
          style={{cursor: 'pointer'}}
          title={title}
          subtitle={author.name || author.email}
        />
        <CardText>
          <ReactMarkdown source={body} />
        </CardText>
        <CardText>
          <p>
            Created At {new Date(createdAt).toLocaleString()}
          </p>
          {
            updatedAt &&
            <p>
              Updated At {new Date(updatedAt).toLocaleString()}
            </p>
          }
        </CardText>
      </Card>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(PostCard);
