var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'immutable', 'react'], factory);
    }
})(function (require, exports) {
    var immutable_1 = require('immutable');
    var react_1 = require('react');
    var WelpComponent = (function (_super) {
        __extends(WelpComponent, _super);
        function WelpComponent(props, stores) {
            _super.call(this, props);
            this.stores = stores;
            this.handleStoresChanged = this.handleStoresChanged.bind(this);
            this.getStateFromStores = this.getStateFromStores.bind(this);
            this.state = this.getStateFromStores();
            this.mounted = false;
        }
        WelpComponent.prototype.componentDidMount = function () {
            this.mounted = true;
        };
        WelpComponent.prototype.componentWillMount = function () {
            var _this = this;
            if (!this.stores) {
                throw new Error('You must have a stores array property');
            }
            if (!this.getStateFromStores) {
                throw new Error('You must implement this.getStateFromStores');
            }
            this.stores.forEach(function (store) {
                store.addChangeListener(_this.handleStoresChanged);
            }, this);
        };
        WelpComponent.prototype.shouldComponentUpdate = function (nextProps, nextState) {
            return !immutable_1.is(this.props, nextProps) || !immutable_1.is(this.state, nextState);
        };
        WelpComponent.prototype.componentWillUnmount = function () {
            var _this = this;
            this.mounted = false;
            this.stores.forEach(function (store) {
                store.removeChangeListener(_this.handleStoresChanged);
            }, this);
        };
        WelpComponent.prototype.getStateFromStores = function () {
            if (this.stores.length > 1) {
                return this.stores.reduce(function (a, b) { return a.getDataStructure().merge(b.getDataStructure()); }).toJS();
            }
            return this.stores[0].getDataStructure().toJS();
        };
        WelpComponent.prototype.handleStoresChanged = function () {
            if (this.mounted) {
                return this.setState(this.getStateFromStores());
            }
        };
        return WelpComponent;
    })(react_1.Component);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WelpComponent;
});
//# sourceMappingURL=Component.js.map