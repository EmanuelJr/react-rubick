# React Rubick
React Rubick is a library based on [React Dazzle](https://github.com/Raathigesh/dazzle) for building dashboards with React.

## Installation
```bash
npm install react-rubick --save
# or
yarn add react-rubick
```

## Usage
```javascript
import React, { Component } from 'react';
import Dashboard from 'react-rubick';

// Your widget. Just another react component.
import CounterWidget from './widgets/CounterWidget';

// Default style.
import 'react-rubick/lib/style/style.css';

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
                a: 'a',
              },
            }],
          }],
        }],
      }
    };
  }

  render() {
    return <Dashboard  widgets={this.state.widgets} layout={this.state.layout}  />
  }
}
```

# [Documentation](https://github.com/EmanuelJr/react-rubick/blob/master/docs/README.md)