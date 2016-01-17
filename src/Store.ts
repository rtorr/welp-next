/// <reference path="./../node_modules/immutable/dist/immutable.d.ts" />
import { fromJS, Iterable } from 'immutable';
import EventEmitter = require('eventemitter3');

import Dispatcher from './Dispatcher';

const CHANGE_EVENT = 'CHANGE_EVENT';

class WelpStore extends EventEmitter {
  _data: any;
  dispatchToken: any;
  constructor(store_data: any, callback: (data: any) => any) {
    super();
    this._data = this.replace(store_data);
    this.dispatchToken = Dispatcher.register((action) => {
      callback(action);
    });
  }
  _check_data(current, next) {
    if (current !== next) {
      this._data = next;
      this.emit(CHANGE_EVENT);
    }
    return this._data;
  }
  replace(data) {
    if (Iterable.isIterable(data)) {
      return this._check_data(this._data, data);
    }
    return this._check_data(this._data, fromJS(data)); 
  }
  data() {
    return this._data;
  }
  get(key) {
    return this._data.get(key);
  }
  getStateData() {
    return this._data.toJS();
  }
  getDataStructure() {
    return this._data;
  }
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

export default WelpStore;
