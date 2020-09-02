import React from 'react';
import './TextField.css';
import connect from '../communication/connect';
import route from '../route';

function TextField(props) {
    const fieldState = {
        invalid: false
    };

    return(
        <React.Fragment>
            <div>
                <input id="input" className="SecurityCodeField" type="text"/>
            </div>
            <div>
                <button className="ConnectButton" type="button" onClick={tryConnect}>Connect</button>
            </div>
        </React.Fragment>
    );

    function tryConnect() {
        const code = document.getElementById("input").value;
        fieldState.invalid = !connect(code);
        getFieldStyle();
    }

    function getFieldStyle() {
        if (fieldState.invalid) {
            document.getElementById("input").className = "SecurityCodeFieldInvalid";
        } else {
            document.getElementById("input").className = "SecurityCodeField";
            route({connected: true});
        }
    }
}

export default TextField;