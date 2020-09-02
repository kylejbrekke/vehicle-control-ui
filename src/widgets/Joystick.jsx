import ReactNipple from 'react-nipple';
import React from 'react';
import { Component } from 'react';

import colors from '../style/colors';

export default class Joystick extends Component {

    constructor(props) {
        super(props);
        this.state = {
            top: props.top,
            left: props.left,
            size: this.props.size
        };
        this.onMove = props.onMove.bind(this);
        this.onEnd = props.onEnd.bind(this);
        console.log(this.state.size);
    }

    render() {
        return (<ReactNipple className="Joystick"
                             options=
                                 {{
                                     color: colors.widgetColor,
                                     restOpacity: 1,
                                     mode: 'static',
                                     position: {top: this.state.top, left: this.state.left},
                                     size: this.state.size
                                 }}
                             style=
                                 {{
                                     width: '120%',
                                     height: '120%'
                                 }}
                             onMove={this.onMove}
                             onEnd={this.onEnd}
        />);
    }
}