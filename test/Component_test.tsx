/// <reference path="./../typings/tsd.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import { assert } from 'chai';
import { renderIntoDocument } from 'react-addons-test-utils';
import Dispatcher from './../lib/Dispatcher';
import Store from './../lib/Store';
import Component from './../lib/Component';

const UPDATE_NUMBER = 'UPDATE_NUMBER';

function update_number(value) {
  Dispatcher.dispatch({
    type: UPDATE_NUMBER,
    data: value
  });
}

const TestStore = new Store(
  {hello: {
    count: 0
  }},
  action => {
    switch (action.type) {
      case UPDATE_NUMBER:
        return TestStore.replace(TestStore.data().updateIn(['hello', 'count'], _ => action.data));
    }
  }
);

class App extends Component {
  constructor(props) {
    super(props, [TestStore]);
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

describe('WelpComponent', () => {
  describe('Check initail state', () => {
    it('We should have initail data from the store', () => {
      const component = renderIntoDocument(<App />);
      assert.equal(component.state.hello.count, 0);
    });
  });
  describe('Update state', () => {
    it('We should have initail data from the store', () => {
      const component = renderIntoDocument(<App />);
       assert.equal(component.state.hello.count, 0);
      update_number(1);
       assert.equal(component.state.hello.count, 1);
    });
  });
});