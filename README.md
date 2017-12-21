# React Rubick
React Rubick is a library based on [React Dazzle](https://github.com/Raathigesh/dazzle) for building dashboards with React.
In React Rubick you can set indvidually title and props of component for each widget.

## Installation
```bash
yarn add react-rubick
# or
npm install react-rubick --save
```

## Usage
```javascript
import React, { Component } from 'react';
import Dashboard from 'react-rubick';

// Default style
import 'react-rubick/lib/style/style.css';

// Your widget
import CounterWidget from './widgets/CounterWidget';

class App extends Component {
  constructor() {
    this.state = {      
      widgets: {
        WordCounter: {
          type: CounterWidget,
          title: 'Counter widget',
        }
      },
      layout: {
        rows: [{
          columns: [{
            className: 'col-md-12',
            widgets: [{
              key: 'WordCounter',
              title: 'Word Counter Report',
              props: {
                Test: 1,
              },
            }],
          }],
        }],
      }
    };
  }

  render() {
    return <Dashboard widgets={this.state.widgets} layout={this.state.layout} />
  }
}
```

## Documentation
You can find the documentation [here](https://github.com/EmanuelJr/react-rubick/blob/master/docs/README.md).