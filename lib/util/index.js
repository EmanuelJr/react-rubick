import update from 'immutability-helper';

/**
 * Adds the specified widget to the specified position in the layout.
 */
export function addWidget(layout, rowIndex, columnIndex, widgetName, widgetTitle, widgetProps) {
  return update(layout, {
    rows: {
      [rowIndex]: {
        columns: {
          [columnIndex]: {
            widgets: {
              $push: [{
                key: widgetName,
                title: widgetTitle,
                props: widgetProps,
              }],
            },
          },
        },
      },
    },
  });
}

/**
 * Removes the widget at a specified index.
 */
export function removeWidget(layout, rowIndex, columnIndex, widgetIndex) {
  return update(layout, {
    rows: {
      [rowIndex]: {
        columns: {
          [columnIndex]: {
            widgets: {
              $splice: [
                [widgetIndex, 1],
              ],
            },
          },
        },
      },
    },
  });
}

/**
 * Moves a widget from column to column.
 */
export function moveWidget(layout, initialLocation, destination, widgetName, widgetTitle, widgetProps) {
  /* eslint max-len: "off" */
  const removedLayout = removeWidget(layout, initialLocation.rowIndex, initialLocation.columnIndex, initialLocation.widgetIndex);
  const movedLayout = addWidget(removedLayout, destination.rowIndex, destination.columnIndex, widgetName, widgetTitle, widgetProps);
  return movedLayout;
}

/**
 * Sorts a widget in the same column.
 */
export function sortWidget(layout, initialLocation, destination, widgetName, widgetTitle, widgetProps) {
  return update(layout, {
    rows: {
      [initialLocation.rowIndex]: {
        columns: {
          [initialLocation.columnIndex]: {
            widgets: {
              $splice: [
                [initialLocation.widgetIndex, 1],
                [destination.widgetIndex, 0, {
                  key: widgetName,
                  title: widgetTitle,
                  props: widgetProps,
                }],
              ],
            },
          },
        },
      },
    },
  });
}
