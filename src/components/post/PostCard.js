import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import PostBody from './PostBody';
import TimeStamps from './TimeStamps';
import { centeredCard } from '../common/styles';
import { connect } from 'react-redux';
import EditPostButton from './buttons/EditPostButton';
import DeletePostButton from './buttons/DeletePostButton';
import ShareButtons from './ShareButtons';

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
        <CardHeader
          onClick={() => {
            this.props.history.push(`/posts/${slug}`);
          }}
          style={{cursor: 'pointer'}}
          title={title}
          subheader={author.name || author.email}
        />
        {
          this.props.admin &&
          <CardActions>
            <EditPostButton slug={slug} />
            <DeletePostButton slug={slug} />
          </CardActions>
        }
        <CardContent>
          <PostBody body={body} />
        </CardContent>
        <CardContent>
          <TimeStamps createdAt={createdAt} updatedAt={updatedAt} />
        </CardContent>
        <CardContent style={{marginTop: -20}}>
          <ShareButtons slug={slug} />
        </CardContent>
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
