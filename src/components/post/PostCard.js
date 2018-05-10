import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PostBody from './PostBody';
import TimeStamps from './TimeStamps';
import { centeredCard } from '../common/styles';
import { connect } from 'react-redux';
import EditPostButton from './buttons/EditPostButton';
import DeletePostButton from './buttons/DeletePostButton';

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
        style={centeredCard}
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
        {
          this.props.admin &&
          <CardActions>
            <EditPostButton slug={slug} />
            <DeletePostButton slug={slug} />
          </CardActions>
        }
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

const mapStateToProps = state => {
  return {
    admin: state.user.admin,
  };
};

PostCard.propTypes = {
  post: PropTypes.object,
  history: PropTypes.object,
  admin: PropTypes.bool,
};

export default connect(mapStateToProps)(withRouter(PostCard));
