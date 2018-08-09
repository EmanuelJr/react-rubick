import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import DefaultFrame from './RowDefaultFrame';
import { sortRow, removeRow } from '../util';
import { ROW } from './ItemTypes';

const boxSource = {
  beginDrag(props) {
    return {
      rowIndex: props.rowIndex,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().rowIndex;
    const hoverIndex = props.rowIndex;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    const { layout } = props;
    const item = monitor.getItem();

    const newLayout = sortRow(layout, dragIndex, hoverIndex);

    props.onChangeLayout(newLayout);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    item.rowIndex = hoverIndex; // eslint-disable-line no-param-reassign
  },
};

@DropTarget(ROW, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
 @DragSource(ROW, boxSource, (connect, monitor) => ({
   connectDragSource: connect.dragSource(),
   isDragging: monitor.isDragging(),
 }))
class RowFrame extends Component {
  onRemove() {
    const newLayout = removeRow(this.props.layout, this.props.rowIndex);
    this.props.onChangeLayout(newLayout);
  }

  onChange(row) {
    const layout = Object.assign({}, this.props.layout);
    Object.assign(layout.rows[this.props.rowIndex], row);
    this.props.onChangeLayout(layout);
  }

  render() {
    let rowElement = null;
    if (this.props.frameComponent) {
      rowElement = createElement(this.props.frameComponent, {
        children: this.props.children,
        editable: this.props.editable,
        row: this.props.layout.rows[this.props.rowIndex],
        onChange: (row) => this.onChange(row),
        onRemove: () => this.onRemove(),
      });
    } else {
      rowElement = (
        <DefaultFrame editable={this.props.editable}>
          {this.props.children}
        </DefaultFrame>
      );
    }

    const opacity = this.props.isDragging ? 0 : 1;
    const rowFrame = (
      <div style={{ opacity }}>
        {rowElement}
      </div>
    );

    return this.props.editable ? this.props.connectDragSource(this.props.connectDropTarget(rowFrame)) : rowFrame;
  }
}

RowFrame.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.object,
  frameComponent: PropTypes.func,
  editable: PropTypes.bool,
  rowIndex: PropTypes.number,
  onChangeLayout: PropTypes.func,
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
};

export default RowFrame;
