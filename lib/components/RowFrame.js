import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { removeRow } from '../util';
import DefaultFrame from './RowDefaultFrame';

class RowFrame extends Component {
  onRemove() {
    const newLayout = removeRow(this.props.layout, this.props.rowIndex);
    this.props.onChange(newLayout);
  }

  render() {
    if (this.props.frameComponent) {
      return createElement(this.props.frameComponent, {
        children: this.props.children,
        editable: this.props.editable,
      });
    }

    return (
      <DefaultFrame editable={this.props.editable}>
        {this.props.children}
      </DefaultFrame>
    );
  }
}

RowFrame.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.object,
  frameComponent: PropTypes.func,
  editable: PropTypes.bool,
  rowIndex: PropTypes.number,
  onChange: PropTypes.func,
};

export default RowFrame;
