## Adding new widget to dashboard

Using `addWidget` method from React Rubick you can pass widget component, title and props to widget.

When add widget is clicked, `onAdd` function will be called. The `onAdd` function will be provided with the current `layout`, index of the `row` and `column` where the new widget should be added.

You could add a new widget to the dashboard by calling the method `addWidget` passing the parameters you received from the `onAdd` callback along with the key of the widget that should be added.

Below is a sample of adding a widget when `Add Widget` is clicked.

```javascript
import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-rubick';
import HelloWorld from './widgets/HelloWorld';

class App extends Component {
  constructor() {
    this.state = {      
      widgets: {
        GreetingsWidget: {
          type: HelloWorld,
          title: 'Hello World Greetings',
        }
      },
      layout: {
        rows: [{
          columns: [{
            className: 'col-md-12',
            widgets: [{
              key: 'GreetingsWidget',
              title: 'Greetings', // Widget title
              props: null, // Here is the component props
            }],
          }],
        }],
      }
    };
  }

  onAdd(layout, rowIndex, columnIndex) {
    // Add another Greetings widget
    this.setState({
      layout: addWidget(layout, rowIndex, columnIndex, 'GreetingsWidget', 'Hello', null),
    });
  }

  render() {
    return (
      <Dashboard
        widgets={this.state.widgets}
        layout={this.state.layout}
        onAdd={() => this.onAdd()}
      />
    );
  }
}
```

But in a more practical use-case, user should select the widget he wants to add to the dashboard.

You could show a modal dialog with all the widgets that could be added and allow the user to select one widget.

When user selects a widget, call the `addWidget` method with the key of the widget along with other parameters.

#### More docs
- [Readme](../README.md)
- [Add a widget](./AddWidget.md)
- [Implementing custom Frame component](./ImplementingACustomFrame.md)
- [Implementing custom AddWidget component](./ImplementingCustomAddWidgetButton.md)
