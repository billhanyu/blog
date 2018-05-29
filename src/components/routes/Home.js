import React, { Component } from 'react';
import NavigationMenu from '../NavigationMenu';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/actions';
import ErrorDisplay from '../common/ErrorDisplay';
import Loading from '../common/Loading';
import PostList from '../post/PostList';
import TagSelection from '../post/tags/TagSelection';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Home extends Component {
  componentWillMount() {
    this.props.getAllPosts();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavigationMenu selectedIndex={1} />
        <div className={classes.root} style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
              {
                !this.props.ready && !this.props.error &&
                <Loading />
              }
              {
                this.props.error &&
                <ErrorDisplay
                  message={this.props.error}
                />
              }
              {
                this.props.ready &&
                <PostList all={this.props.all} />
              }
            </Grid>
            <Grid item xs={12} sm={3}>
              <TagSelection sm />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  all: PropTypes.array,
  ready: PropTypes.bool,
  error: PropTypes.string,
  getAllPosts: PropTypes.func,
  classes: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    all: state.posts.all,
    ready: state.posts.ready,
    error: state.posts.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
