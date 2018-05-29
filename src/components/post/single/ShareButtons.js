import React, { Component } from 'react';
import PropTypes from 'prop-types';
const { siteURL } = require('../../../config');
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  GooglePlusIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    cursor: 'pointer',
    marginRight: 30,
  },
  block: {
    display: 'inline-block',
  },
};

class ShareButtons extends Component {
  render() {
    const { classes, slug } = this.props;
    const url = `${siteURL}/posts/${slug}`;
    return (
      <div>
        <div className={classes.block}>
          <FacebookShareButton url={url} className={classes.button}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div className={classes.block}>
          <GooglePlusShareButton url={url} className={classes.button}>
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>
        <div className={classes.block}>
          <LinkedinShareButton url={url} className={classes.button}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
        <div className={classes.block}>
          <TwitterShareButton url={url} className={classes.button}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
    );
  }
}

ShareButtons.propTypes = {
  slug: PropTypes.string,
  classes: PropTypes.object,
};

export default withStyles(styles)(ShareButtons);
