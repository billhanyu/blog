import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { getComments } from '../../../actions/actions';
import EditComment from './EditComment';
import { centeredCard } from '../../common/styles';

class Comments extends Component {
  componentWillMount() {
    this.props.getComments(this.props.slug);
  }

  render() {
    return (
      <Card
        style={centeredCard}
      >
        <CardHeader
          title='Comments'
        />
        <CardContent>
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
        </CardContent>
        <CardContent>
          <EditComment slug={this.props.slug} />
        </CardContent>
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
    getComments: slug => dispatch(getComments(slug)),
  };
};

Comments.propTypes = {
  slug: PropTypes.string,
  comments: PropTypes.array,
  error: PropTypes.string,
  getComments: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
