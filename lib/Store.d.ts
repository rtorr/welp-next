/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
import EventEmitter = require('eventemitter3');
declare class WelpStore extends EventEmitter {
    _data: any;
    dispatchToken: any;
    constructor(store_data: any, callback: (data: any) => any);
    _check_data(current: any, next: any): any;
    replace(data: any): any;
    data(): any;
    get(key: any): any;
    getStateData(): any;
    getDataStructure(): any;
    emitChange(): void;
    addChangeListener(callback: any): void;
    removeChangeListener(callback: any): void;
}
export default WelpStore;
