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
import Fade from '@material-ui/core/Fade';
const qs = require('querystring');

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagsToFilter: [],
    };
  }

  componentWillMount() {
    this.filterWithTags(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location.search !== this.props.location.search) {
      this.filterWithTags(newProps);
    }
  }

  filterWithTags(props) {
    const query = props.location.search;
    let tagsToFilter = [];
    if (query.length > 1) {
      const tagsInQuery = qs.parse(query.substring(1)).tags;
      try {
        tagsToFilter = JSON.parse(tagsInQuery);
      } catch (e) {
        tagsToFilter = [tagsInQuery.toString()];
      }
    }
    props.getAllPosts(tagsToFilter);
    this.setState({
      tagsToFilter,
    });
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
              <Fade in={this.props.ready}>
                <PostList all={this.props.all} />
              </Fade>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TagSelection
                tagsToFilter={this.state.tagsToFilter}
              />
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
  location: PropTypes.object,
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
    getAllPosts: tags => dispatch(getAllPosts(tags)),
  };
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
