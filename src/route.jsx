import React from 'react';
import ReactDOM from 'react-dom';
import ControllerPage from './controller/ControllerPage';
import ConnectionPage from './communication/ConnectionPage';

export default function (props) {
    if (!props.connected) {
        ReactDOM.render(<ConnectionPage/>, document.getElementById("root"));
    } else {
        ReactDOM.render(<ControllerPage/>, document.getElementById("root"));
    }
}