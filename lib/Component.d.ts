/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />
import { Component } from 'react';
declare class WelpComponent extends Component<any, any> {
    stores: any;
    mounted: any;
    state: any;
    props: any;
    constructor(props: any, stores: any);
    componentDidMount(): void;
    componentWillMount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentWillUnmount(): void;
    getStateFromStores(): any;
    handleStoresChanged(): void;
}
export default WelpComponent;
