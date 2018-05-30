import React, { Component } from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import SuggestionItem from './SuggestionItem';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function getSuggestions(inputValue, suggestions) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class EditTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      tagList: [],
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyDown(event) {
    const { inputValue, tagList } = this.state;
    if (tagList.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        tagList: tagList.slice(0, tagList.length - 1),
      });
    }
  };

  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  };

  handleChange(item) {
    let { tagList } = this.state;

    if (tagList.indexOf(item) === -1) {
      tagList = [...tagList, item];
    }

    this.setState({
      inputValue: '',
      tagList,
    });
  };

  handleDelete(item) {
    const tagList = [...this.state.tagList];
    tagList.splice(tagList.indexOf(item), 1);

    this.setState({ tagList });
  };

  render() {
    const { classes, all } = this.props;
    const { inputValue, tagList } = this.state;

    return (
      <div className={classes.root}>
        <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={tagList}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => (
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    startAdornment: tagList.map(item => (
                      <Chip
                        key={item}
                        tabIndex={-1}
                        label={item}
                        className={classes.chip}
                        onDelete={() => this.handleDelete(item)}
                      />
                    )),
                    onChange: this.handleInputChange,
                    onKeyDown: this.handleKeyDown,
                    placeholder: 'Add/Edit Tags',
                    id: 'integration-downshift-multiple',
                  }),
                })}
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {getSuggestions(inputValue2, all).map((suggestion, index) => {
                      return (
                        <SuggestionItem
                          key={index}
                          suggestion={suggestion}
                          index={index}
                          itemProps={getItemProps({ item: suggestion })}
                          highlightedIndex={highlightedIndex}
                          selectedTags={selectedItem2}
                        />
                      );
                    })}
                </Paper>
                ) : null}
              </div>
            )}
        </Downshift>
      </div>
    );
  }
}

EditTags.propTypes = {
  classes: PropTypes.object.isRequired,
  all: PropTypes.array,
  tagList: PropTypes.array,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

export default withStyles(styles)(EditTags);
