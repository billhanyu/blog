import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostCard from './single/PostCard';
import TagSelection from './tags/TagSelection';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class PostList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{padding: 12}}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={9}>
            {
              this.props.all.map(post => {
                return (
                  <PostCard
                    key={post.slug}
                    post={post}
                  />
                );
              })
            }
          </Grid>
          <Grid item xs={12} sm={3}>
            <TagSelection sm/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PostList.propTypes = {
  all: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(styles)(PostList);
