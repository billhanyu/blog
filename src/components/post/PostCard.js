import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PostBody from './PostBody';
import TimeStamps from './TimeStamps';

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
      <Card
        style={{
          width: '80%',
          margin: '40px auto',
          padding: '50px',
        }}
      >
        <CardTitle
          onClick={() => {
            this.props.history.push(`/posts/${slug}`);
          }}
          style={{cursor: 'pointer'}}
          title={title}
          titleStyle={{
            fontWeight: 600,
            fontSize: 30,
          }}
          subtitle={author.name || author.email}
        />
        <CardText>
          <PostBody body={body} />
        </CardText>
        <CardText>
          <TimeStamps createdAt={createdAt} updatedAt={updatedAt} />
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
