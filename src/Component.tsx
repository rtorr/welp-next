/// <reference path="./../node_modules/immutable/dist/immutable.d.ts" />
import { is } from 'immutable';
import { Component } from 'react';

class WelpComponent extends Component<any, any> {
  
  stores: any;
  mounted: any;
  state: any;
  props: any;
  
  constructor(props, stores) {
    super(props);
    this.stores = stores;
    this.handleStoresChanged = this.handleStoresChanged.bind(this);
    this.getStateFromStores = this.getStateFromStores.bind(this);
    this.state = this.getStateFromStores();
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillMount() {
    if (!this.stores) {
      throw new Error('You must have a stores array property');
    }
    if (!this.getStateFromStores) {
      throw new Error('You must implement this.getStateFromStores');
    }
    this.stores.forEach(store => {
      store.addChangeListener(this.handleStoresChanged);
    }, this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(this.props, nextProps) || !is(this.state, nextState);
  }

  componentWillUnmount() {
    this.mounted = false;
    this.stores.forEach(store => {
      store.removeChangeListener(this.handleStoresChanged);
    }, this);
  }

  getStateFromStores() {
    if (this.stores.length > 1) {
      return this.stores.reduce((a, b) => a.getDataStructure().merge(b.getDataStructure())).toJS();
    }
    return this.stores[0].getDataStructure().toJS();
  }

  handleStoresChanged() {
    if (this.mounted) {
      return this.setState(this.getStateFromStores());
    }
  }

}

export default WelpComponent;