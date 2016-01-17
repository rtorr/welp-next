import * as React from 'react';
import { render } from 'react-dom';
import Dispatcher from './../src/Dispatcher';
import Store from './../src/Store';
import Component from './../src/Component';

const UPDATE_NUMBER = 'UPDATE_NUMBER';

function update_number(value:number) {
  return Dispatcher.dispatch({
    type: UPDATE_NUMBER,
    data: value
  });
}

var DemoStore = new Store(
  {hello: {
    count: 0
  }}
  , action => {
    switch (action.type) {
      case UPDATE_NUMBER:
        return DemoStore.replace(DemoStore.data().updateIn(['hello', 'count'], _ => action.data));
    }
  })

class App extends Component {
  constructor(props) {
    super(props, [DemoStore]);
    this.handleUpdateNumberChange = this.handleUpdateNumberChange.bind(this);
  }
  handleUpdateNumberChange() {
    return update_number(this.state.hello.count + 1);
  }
  render() {
    return (
      <div>
        <p>Hello world! {this.state.hello.count}</p>
        <button onClick={this.handleUpdateNumberChange}>Add + 1</button>
      </div>
    );
  }
}

render(<App />, document.getElementById('example'));
