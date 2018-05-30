import React, { Component } from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { requestTags, addFilterTags, removeFilterTags } from '../../../actions/actions';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const styles = theme => ({
  tags: {
    [theme.breakpoints.up('sm')]: {
      marginTop: 60,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 40,
    },
  },
});

class TagSelection extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.requestTags();
  }

  handleChange(name, event) {
    const checked = event.target.checked;
    if (checked) {
      this.props.addFilterTag(name);
    } else {
      this.props.removeFilterTag(name);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.tags}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Filter with Tags</FormLabel>
          <FormGroup>
            {
              this.props.all.map((tag, idx) => {
                return (
                  <FormControlLabel
                    key={idx}
                    control={
                      <Checkbox
                        checked={this.props.selected.includes(tag)}
                        onChange={e => this.handleChange(tag, e)}
                        value={tag}
                      />
                    }
                    label={tag}
                  />
                );
              })
            }
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.tags,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestTags: () => dispatch(requestTags()),
    addFilterTag: tag => dispatch(addFilterTags([tag])),
    removeFilterTag: tag => dispatch(removeFilterTags([tag])),
  };
};

TagSelection.propTypes = {
  all: PropTypes.array,
  selected: PropTypes.array,
  requestTags: PropTypes.func,
  classes: PropTypes.object,
  addFilterTag: PropTypes.func,
  removeFilterTag: PropTypes.func,
};

export default compose(withStyles(styles), withWidth())(connect(mapStateToProps, mapDispatchToProps)(TagSelection));
