import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

class SuggestionItem extends Component {
  render() {
    const { suggestion, index, itemProps, highlightedIndex, selectedTags } = this.props;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedTags || '').indexOf(suggestion) > -1;
    return (
      <MenuItem
        {...itemProps}
        key={suggestion}
        selected={isHighlighted}
        component='div'
        style={{
          fontWeight: isSelected ? 600 : 400,
        }}
      >
        {suggestion}
      </MenuItem>
    );
  }
}

SuggestionItem.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedTags: PropTypes.array,
  suggestion: PropTypes.string,
};

export default SuggestionItem;
