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
        define(["require", "exports", 'react', 'chai', 'react-addons-test-utils', './../lib/Dispatcher', './../lib/Store', './../lib/Component'], factory);
    }
})(function (require, exports) {
    /// <reference path="./../typings/tsd.d.ts" />
    var React = require('react');
    var chai_1 = require('chai');
    var react_addons_test_utils_1 = require('react-addons-test-utils');
    var Dispatcher_1 = require('./../lib/Dispatcher');
    var Store_1 = require('./../lib/Store');
    var Component_1 = require('./../lib/Component');
    var UPDATE_NUMBER = 'UPDATE_NUMBER';
    function update_number(value) {
        Dispatcher_1["default"].dispatch({
            type: UPDATE_NUMBER,
            data: value
        });
    }
    var TestStore = new Store_1["default"]({ hello: {
            count: 0
        } }, function (action) {
        switch (action.type) {
            case UPDATE_NUMBER:
                return TestStore.replace(TestStore.data().updateIn(['hello', 'count'], function (_) { return action.data; }));
        }
    });
    var App = (function (_super) {
        __extends(App, _super);
        function App(props) {
            _super.call(this, props, [TestStore]);
            this.handleUpdateNumberChange = this.handleUpdateNumberChange.bind(this);
        }
        App.prototype.handleUpdateNumberChange = function () {
            return update_number(this.state.hello.count + 1);
        };
        App.prototype.render = function () {
            return (React.createElement("div", null, React.createElement("p", null, "Hello world! ", this.state.hello.count), React.createElement("button", {"onClick": this.handleUpdateNumberChange}, "Add + 1")));
        };
        return App;
    })(Component_1["default"]);
    describe('WelpComponent', function () {
        describe('Check initail state', function () {
            it('We should have initail data from the store', function () {
                var component = react_addons_test_utils_1.renderIntoDocument(React.createElement(App, null));
                chai_1.assert.equal(component.state.hello.count, 0);
            });
        });
        describe('Update state', function () {
            it('We should have initail data from the store', function () {
                var component = react_addons_test_utils_1.renderIntoDocument(React.createElement(App, null));
                chai_1.assert.equal(component.state.hello.count, 0);
                update_number(1);
                chai_1.assert.equal(component.state.hello.count, 1);
            });
        });
    });
});
