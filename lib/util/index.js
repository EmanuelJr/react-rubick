/**
 * Adds the specified widget to the specified position in the layout.
 */
export function addWidget(layout, rowIndex, columnIndex, widgetName, widgetTitle, widgetProps) {
  const widgets = Object.assign([], layout.rows[rowIndex].columns[columnIndex].widgets);
  widgets.push({
    key: widgetName,
    title: widgetTitle,
    props: widgetProps,
  });

  return Object.assign({}, {
    ...layout,
    rows: Object.assign([], {
      ...layout.rows,
      [rowIndex]: {
        ...layout.rows[rowIndex],
        columns: Object.assign([], {
          ...layout.rows[rowIndex].columns,
          [columnIndex]: {
            ...layout.rows[rowIndex].columns[columnIndex],
            widgets,
          },
        }),
      },
    }),
  });
}

/**
 * Removes the widget at a specified index.
 */
export function removeWidget(layout, rowIndex, columnIndex, widgetIndex) {
  const widgets = Object.assign([], layout.rows[rowIndex].columns[columnIndex].widgets);
  widgets.splice(widgetIndex, 1);

  return Object.assign({}, {
    ...layout,
    rows: Object.assign([], {
      ...layout.rows,
      [rowIndex]: {
        ...layout.rows[rowIndex],
        columns: Object.assign([], {
          ...layout.rows[rowIndex].columns,
          [columnIndex]: {
            ...layout.rows[rowIndex].columns[columnIndex],
            widgets,
          },
        }),
      },
    }),
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
  const widgets = Object.assign([], layout.rows[initialLocation.rowIndex].columns[initialLocation.columnIndex].widgets);
  widgets.splice(initialLocation.widgetIndex, 1);
  widgets.splice(destination.widgetIndex, 0, {
    key: widgetName,
    title: widgetTitle,
    props: widgetProps,
  });

  return Object.assign({}, {
    ...layout,
    rows: Object.assign([], {
      ...layout.rows,
      [initialLocation.rowIndex]: {
        ...layout.rows[initialLocation.rowIndex],
        columns: Object.assign([], {
          ...layout.rows[initialLocation.rowIndex].columns,
          [initialLocation.columnIndex]: {
            ...layout.rows[initialLocation.rowIndex].columns[initialLocation.columnIndex],
            widgets,
          },
        }),
      },
    }),
  });
}
