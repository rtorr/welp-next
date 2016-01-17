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
        define(["require", "exports", 'immutable', 'eventemitter3', './Dispatcher'], factory);
    }
})(function (require, exports) {
    var immutable_1 = require('immutable');
    var EventEmitter = require('eventemitter3');
    var Dispatcher_1 = require('./Dispatcher');
    var CHANGE_EVENT = 'CHANGE_EVENT';
    var WelpStore = (function (_super) {
        __extends(WelpStore, _super);
        function WelpStore(store_data, callback) {
            _super.call(this);
            this._data = this.replace(store_data);
            this.dispatchToken = Dispatcher_1.default.register(function (action) {
                callback(action);
            });
        }
        WelpStore.prototype._check_data = function (current, next) {
            if (current !== next) {
                this._data = next;
                this.emit(CHANGE_EVENT);
            }
            return this._data;
        };
        WelpStore.prototype.replace = function (data) {
            if (immutable_1.Iterable.isIterable(data)) {
                return this._check_data(this._data, data);
            }
            return this._check_data(this._data, immutable_1.fromJS(data));
        };
        WelpStore.prototype.data = function () {
            return this._data;
        };
        WelpStore.prototype.get = function (key) {
            return this._data.get(key);
        };
        WelpStore.prototype.getStateData = function () {
            return this._data.toJS();
        };
        WelpStore.prototype.getDataStructure = function () {
            return this._data;
        };
        WelpStore.prototype.emitChange = function () {
            this.emit(CHANGE_EVENT);
        };
        WelpStore.prototype.addChangeListener = function (callback) {
            this.on(CHANGE_EVENT, callback);
        };
        WelpStore.prototype.removeChangeListener = function (callback) {
            this.removeListener(CHANGE_EVENT, callback);
        };
        return WelpStore;
    })(EventEmitter);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WelpStore;
});
//# sourceMappingURL=Store.js.map