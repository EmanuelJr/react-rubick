import React from 'react';
import PropTypes from 'prop-types';
import Column from './Column';
import Widgets from './Widgets';
import RowFrame from './RowFrame';

/**
 * Returns a set of columns that belongs to a row.
 */
function Row({
  frameComponent,
  row,
  widgets,
  layout,
  rowIndex,
  editable,
  widgetFrameComponent,
  editableColumnClass,
  droppableColumnClass,
  addWidgetComponentText,
  addWidgetComponent,
  onAddWidget,
  onChangeLayout,
}) {
  const items = row.columns.map((column, index) => {
    return (
      <Column
        key={index}
        className={column.className}
        onAdd={onAddWidget}
        layout={layout}
        widgets={widgets}
        rowIndex={rowIndex}
        columnIndex={index}
        editable={editable}
        onChangeLayout={onChangeLayout}
        editableColumnClass={editableColumnClass}
        droppableColumnClass={droppableColumnClass}
        addWidgetComponent={addWidgetComponent}
        addWidgetComponentText={addWidgetComponentText}
      >
        <Widgets
          key={index}
          widgets={column.widgets}
          widgetTypes={widgets}
          onChangeLayout={onChangeLayout}
          layout={layout}
          rowIndex={rowIndex}
          columnIndex={index}
          editable={editable}
          frameComponent={widgetFrameComponent}
        />
      </Column>
    );
  });

  return (
    <RowFrame
      layout={layout}
      editable={editable}
      rowIndex={rowIndex}
      frameComponent={frameComponent}
      onChangeLayout={onChangeLayout}
    >
      {items}
    </RowFrame>
  );
}

Row.propTypes = {
  /**
   * CSS class that should be used to represent a row.
   */
  frameComponent: PropTypes.string,

  /**
   * Columns of the layout.
   */
  row: PropTypes.object,

  /**
   * Widgets that should be used in the dashboard.
   */
  widgets: PropTypes.object,

  /**
   * Layout of the dashboard.
   */
  layout: PropTypes.object,

  /**
   * Index of the row where this column is in.
   */
  rowIndex: PropTypes.number,

  /**
   * Indicates weather the dashboard is in editable mode or not.
   */
  editable: PropTypes.bool,

  /**
   * Custom frame that should be used with the widget.
   */
  widgetFrameComponent: PropTypes.func,

  /**
   * Class to be used for columns in editable mode.
   */
  editableColumnClass: PropTypes.string,

  /**
   * CSS class to be used for columns when a widget is droppable.
   */
  droppableColumnClass: PropTypes.string,

  /**
   * Custom AddWidget component.
   */
  addWidgetComponent: PropTypes.func,

  /**
   * Text that should be displyed in the AddWidget component.
   */
  addWidgetComponentText: PropTypes.string,

  /**
   * Method that should be called when a component is added.
   */
  onAddWidget: PropTypes.func,

  /**
   * Method that should be called when a component is edited.
   */
  onChangeLayout: PropTypes.func,
};

export default Row;
