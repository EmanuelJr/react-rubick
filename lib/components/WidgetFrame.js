import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { WIDGET } from './ItemTypes';
import { removeWidget, sortWidget } from '../util';
import DefaultFrame from './WidgetDefaultFrame';

const boxSource = {
  beginDrag(props) {
    return {
      widgetName: props.widgetName,
      title: props.title,
      props: props.widgetProps,
      rowIndex: props.rowIndex,
      columnIndex: props.columnIndex,
      widgetIndex: props.widgetIndex,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().widgetIndex;
    const hoverIndex = props.widgetIndex;

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
    const { layout, columnIndex, rowIndex } = props;
    const item = monitor.getItem();

    // Remove useless props
    delete item.props.widgetData;
    Object.keys(props.widgetTypes[item.widgetName].props).forEach((key) => {
      delete item.props[key];
    });

    if (item.columnIndex === columnIndex) {
      const newLayout = sortWidget(layout, {
        rowIndex,
        columnIndex,
        widgetIndex: dragIndex,
      }, {
        rowIndex,
        columnIndex,
        widgetIndex: hoverIndex,
      }, item.widgetName, item.title, item.props);

      props.onChangeLayout(newLayout);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.widgetIndex = hoverIndex; // eslint-disable-line no-param-reassign
    }
  },
};

/**
 * Frame component which surrounds each widget.
 */
 @DropTarget(WIDGET, cardTarget, connect => ({
   connectDropTarget: connect.dropTarget(),
 }))
 @DragSource(WIDGET, boxSource, (connect, monitor) => ({
   connectDragSource: connect.dragSource(),
   isDragging: monitor.isDragging(),
 }))
class WidgetFrame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: false,
    };
  }

  render() {
    const {
      frameComponent,
      editable,
      title,
      connectDragSource,
      connectDropTarget,
      isDragging,
      widgetTypes,
      widgetKey,
      widgetProps,
    } = this.props;

    let selected = null;

    const widgetComponentProps = Object.assign(
      widgetProps,
      {
        widgetData: Object.assign({},
          widgetProps.widgetData,
          {
            editable: this.state.editable,
            setEditable: edit => this.setEditable(edit),
          }
        ),
      },
    );

    if (frameComponent) {
      // if user provided a custom frame, use it
      selected = createElement(frameComponent, {
        children: createElement(widgetTypes[widgetKey].type, widgetComponentProps),
        editable,
        title,
        onRemove: () => this.removeWidget(),
        onEdit: () => this.setEditable(),
      });
    } else {
      // else use the default frame
      selected = (
        <DefaultFrame
          title={title}
          editable={editable}
          children={createElement(widgetTypes[widgetKey].type, widgetComponentProps)}
          onRemove={() => this.removeWidget()}
          onEdit={null}
        />
      );
    }

    const opacity = isDragging ? 0 : 1;
    const widgetFrame = (
      <div style={{ opacity }}>
        {selected}
      </div>
    );

    return editable ? connectDragSource(connectDropTarget(widgetFrame)) : widgetFrame;
  }

  setEditable(editable) {
    if (editable) {
      this.setState({
        editable: !this.state.editable,
      });
      return;
    }

    this.setState({
      editable: !this.state.editable,
    });
  }

  removeWidget() {
    const { layout, rowIndex, columnIndex, widgetIndex } = this.props;
    const newLayout = removeWidget(layout, rowIndex, columnIndex, widgetIndex);
    this.props.onChangeLayout(newLayout);
  }
}

WidgetFrame.propTypes = {
  /**
   * Layout of the dahsboard.
   */
  layout: PropTypes.object,

  /**
   * Index of the column these widgets should be placed.
   */
  columnIndex: PropTypes.number,

  /**
   * Index of the row these widgets should be placed.
   */
  rowIndex: PropTypes.number,

  /**
   * Index of the widget.
   */
  widgetIndex: PropTypes.number,

  /**
   * Indicates weatehr dashboard is in ediable mode or not.
   */
  editable: PropTypes.bool,

  /**
   * User provided widget frame that should be used instead of the default one.
   */
  frameComponent: PropTypes.func,

  /**
   * Name of the widget.
   */
  widgetName: PropTypes.string,

  /**
   * Title of the widget.
   */
  title: PropTypes.string,

  /**
   * Weather the component is being dragged.
   */
  isDragging: PropTypes.bool,

  /**
   * ReactDnd's connectDragSource().
   */
  connectDragSource: PropTypes.func,

  /**
   * ReactDnd's connectDropTarget().
   */
  connectDropTarget: PropTypes.func,

  /**
   * Function that should be called when a widget is about to be edited.
   */
  onChangeLayout: PropTypes.func,

  /**
   * Widgets React component array
   */
  widgetTypes: PropTypes.array,

  /**
   * Widget React component key
   */
  widgetKey: PropTypes.string,

  /**
   * Widget props
   */
  widgetProps: PropTypes.object,
};

export default WidgetFrame;
