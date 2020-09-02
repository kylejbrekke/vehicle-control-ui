import TextField from "../widgets/TextField";
import React from "react";
import './ConnectionPage.css';

export default class ConnectionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            connected: props.connected
        };
    }

    render() {
        return (
            <div className="ConnectionPage">
                <TextField/>
            </div>
        );
    }
}