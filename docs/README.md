# Documentation
| Props | Type| Description | Required |
| --- | --- | --- | --- |
| layout | Object | Layout of the dashboard. | Yes |
| widgets | Object| Widgets that could be added to the dashboard. | Yes |
| editable | Boolean |Indicates whether the dashboard is in editable mode. | No |
| rowClass | String |CSS class name(s) that should be given to the row div element. Default is `row`. | No |
| editableColumnClass | String |CSS class name(s) that should be used when a column is in editable mode. | No |
| droppableColumnClass  | String |CSS class name(s) that should be used when a widget is about to be dropped in a column. | No |
| frameComponent | Component | Customized frame component which should be used instead of the default frame. [More on custom frame component.](https://github.com/EmanuelJr/react-rubick/blob/master/docs/ImplementingACustomFrame.md) | No |
| addWidgetComponent | Component | Customized add widget component which should be used instead of the default AddWidget component. [More on custom add widget component.](https://github.com/EmanuelJr/react-rubick/blob/master/docs/ImplementingCustomAddWidgetButton.md) | No |
| addWidgetComponentText | String | Text that should be displayed in the Add Widget component. Default is `Add Widget`. | No |
| onAdd(layout, rowIndex, columnIndex) | function |Will be called when user clicks the `AddWidget` component.| No |
| onRemove(layout) | function |Will be called when a widget is removed.| No |
| onMove(layout) | function | Will be called when a widget is moved.| No |

### Providing `widgets`
`widgets` prop of the dashboard component takes an object. A sample `widgets` object would look like below. This object holds all the widgets that could be used in the dashboard.
All widget has a prop labeled as `widgetData` with row, column and widget index in layout.

```javascript
{
  HelloWorldWidget: {
    type: HelloWorld,
    title: 'Hello World Title',
    props: {
      text: 'Hello Humans!'
    }
  },
  AnotherWidget: {
    type: AnotherWidget,
    title: 'Another Widget Title'
  }
 }
 ```
 - `type` property - Should be a React component function or class.
 - `title` property - Title of the widget that should be displayed on top of the widget.
 - `props` property - Props that should be provided to the widget.


### Dashboard `layout`
The `layout` prop takes the current layout of the dashboard. Layout could have multiple rows and columns. A sample layout object with a single row and two columns would look like below.

```javascript
{
  rows: [{
    columns: [{
      className: 'col-md-6 col-sm-6 col-xs-12',
      widgets: [{ key: 'HelloWorldWidget' }]
    }, {
      className: 'col-md-6 col-sm-6 col-xs-12',
      widgets: [{ key: 'AnotherWidget' }]
    }]
  }]
}
```
- `className`  property - CSS class(es) that should be given to the column in  the grid layout. Above sample layout uses the classes from bootstrap library. You could use the classes of your CSS library.
- `widgets` property - An array of widgets that should be rendered in that particular column. `key` property of the widgets array should be a key from the `widgets` object.

### Edit mode
Setting `editable` prop to `true` will make the dashboard editable.

### Add new widget
When user tries to add a new widget, the `onAdd` callback will be called. <a href="https://github.com/EmanuelJr/react-rubick/blob/master/docs/AddWidget.md">More info here on how to handle widget addition.</a>

### Remove a widget
When a widget is removed, `onRemove` method will be called and new layout (The layout with the widget removed) will be available as an argument of `onRemove` method. Set the provided layout again to the dashboard to complete the widget removal. [The Sample repository has the this feature implemented](https://github.com/EmanuelJr/react-rubick-Starter-Kit/blob/master/src/components/Dashboard.jsx).

## Customization

### Implementing custom `WidgetFrame` component
A frame is the component which surrounds a widget. A frame has the title and the close button. Dazzle provides a default frame out of the box. But if you want, you can customize the frame as you like. <a href="https://github.com/EmanuelJr/react-rubick/blob/master/docs/ImplementingACustomFrame.md">More info here.</a>

### Implementing custom `AddWidget` component
Dazzle also allows you to customize the `Add Widget` component which appears when you enter edit mode. <a href="https://github.com/EmanuelJr/react-rubick/blob/master/docs/ImplementingCustomAddWidgetButton.md">More info here.</a>