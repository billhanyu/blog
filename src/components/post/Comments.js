import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { List } from 'material-ui/List';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { getComments } from '../../actions/actions';
import EditComment from './EditComment';

class Comments extends Component {
  componentWillMount() {
    this.props.getComments(this.props.slug);
  }

  render() {
    return (
      <Card
        style={{
          width: '80%',
          margin: '40px auto',
          padding: '50px',
        }}
      >
        <CardTitle
          title='Comments'
          titleStyle={{
            fontWeight: 600,
            fontSize: 25,
          }}
        />
        <CardText>
          <List>
            {
              this.props.comments.map((comment, idx) => {
                return (
                  <CommentItem
                    key={idx}
                    comment={comment}
                  />
                );
              })
            }
          </List>
        </CardText>
        <CardText>
          <EditComment slug={this.props.slug} />
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments.all,
    error: state.comments.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getComments: (slug) => dispatch(getComments(slug)),
  };
};

Comments.propTypes = {
  slug: PropTypes.string,
  comments: PropTypes.array,
  error: PropTypes.string,
  getComments: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
