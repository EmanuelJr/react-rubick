import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

/**
 * Renders the row, column layout based on the layout provided to the dashboard.
 */
function LayoutRenderer({
  layout,
  widgets,
  onRemoveWidget,
  editable,
  onAddWidget,
  rowFrameComponent,
  widgetFrameComponent,
  onMoveWidget,
  editableColumnClass,
  droppableColumnClass,
  addWidgetComponentText,
  addWidgetComponent,
}) {
  const rows = layout.rows.map((row, rowIndex) => {
    return (
      <Row
        key={rowIndex}
        row={row}
        widgets={widgets}
        onRemoveWidget={onRemoveWidget}
        layout={layout}
        rowIndex={rowIndex}
        editable={editable}
        onAddWidget={onAddWidget}
        onMoveWidget={onMoveWidget}
        frameComponent={rowFrameComponent}
        widgetFrameComponent={widgetFrameComponent}
        editableColumnClass={editableColumnClass}
        droppableColumnClass={droppableColumnClass}
        addWidgetComponentText={addWidgetComponentText}
        addWidgetComponent={addWidgetComponent}
      />
    );
  });

  return (
    <div>
      {rows}
    </div>
  );
}

LayoutRenderer.propTypes = {
  /**
   * Layout of the dashboard.
   */
  layout: PropTypes.object,

  /**
   * Widgets that the dashboard supports.
   */
  widgets: PropTypes.object,

  /**
   * Indicates weather this dashboard is in editable mode.
   */
  editable: PropTypes.bool,

  /**
   * Function that will be called when user removed a widget.
   */
  onRemoveWidget: PropTypes.func,

  /**
   * Function that will be called user tries to add a widget.
   */
  onAddWidget: PropTypes.func,

  /**
   * Frame that should be used as the outer container of row.
   */
  rowFrameComponent: PropTypes.func,

  /**
   * Frame that should be used as the outer container of the widget.
   */
  widgetFrameComponent: PropTypes.func,

  /**
   * Function to be called when a widget is moved by the user.
   */
  onMoveWidget: PropTypes.func,

  /**
   * Class to be used for columns in editable mode.
   */
  editableColumnClass: PropTypes.string,

  /**
   * CSS class to be used for columns when a widget is droppable.
   */
  droppableColumnClass: PropTypes.string,

  /**
   * Customized AddWidget component.
   */
  addWidgetComponent: PropTypes.func,

  /**
   * Text that should be displayed in the `AddWidget` component.
   */
  addWidgetComponentText: PropTypes.string,
};

LayoutRenderer.defaultProps = {
  layout: {
    rows: [],
  },
};

export default LayoutRenderer;
