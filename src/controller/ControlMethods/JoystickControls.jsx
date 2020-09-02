import React from 'react';
import {Fragment} from 'react';
import { RotateCcw, RotateCw } from 'react-feather';

import Joystick from '../../widgets/Joystick';
import Button from '../../widgets/Buttons';
import drive from '../../communication/drive';

export default class JoystickControls extends React.Component {
    state = {
        height: 0,
        width: 0,
        landscape: true,
        turnLeft: false,
        turnRight: false,
        data: null
    };

    componentDidMount() {
        this.handleJoystick = this.handleJoystick.bind(this);
        this.handleJoystickStop = this.handleJoystickStop.bind(this);
        this.leftTurnDown = this.leftTurnDown.bind(this);
        this.leftTurnUp = this.leftTurnUp.bind(this);
        this.rightTurnDown = this.rightTurnDown.bind(this);
        this.rightTurnUp = this.rightTurnUp.bind(this);
        this.updateWindowSize = this.updateWindowSize.bind(this);
        this.updateWindowSize();
        this.interval = setInterval(() => drive(this.driveCommand()), 10);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    driveCommand = () => {
        if (this.state.data !== null) {
            // noinspection JSSuspiciousNameCombination
            return {
                sideTrack: Math.cos(this.state.data.angle.radian),
                leftTrack: Math.sin(this.state.data.angle.radian),
                rightTrack: Math.sin(this.state.data.angle.radian)
            };
        }

        if (this.state.turnLeft && this.state.turnRight) {
            console.log('CONFLICT: No Motion');
            return {
                sideTrack: 0,
                leftTrack: 0,
                rightTrack: 0
            };
        }

        if (this.state.turnLeft) {
            console.log('turn-left');
            return {
                sideTrack: 0,
                leftTrack: 1,
                rightTrack: -1
            };
        } else if (this.state.turnRight) {
            console.log('turn-right');
            return {
                sideTrack: 0,
                leftTrack: 1,
                rightTrack: -1
            };
        } else {
            console.log('No Input');
            return {
                sideTrack: 0,
                leftTrack: 0,
                rightTrack: 0
            };
        }
    };

    leftTurnDown() {
        this.setState({turnLeft: true})
    }

    leftTurnUp() {
        this.setState({turnLeft: false})
    }

    rightTurnDown() {
        this.setState({turnRight: true})
    }

    rightTurnUp() {
        this.setState({turnRight: false})
    }

    handleJoystick(event, data) {
        this.setState({data})
    }

    handleJoystickStop(event, data) {
        this.setState({data: null})
    }

    updateWindowSize() {
        this.setState({
            height: document.getElementById("container").offsetHeight,
            width: document.getElementById("container").offsetWidth,
            landscape: window.innerHeight < window.innerWidth
        });
    }

    render() {
        window.onresize = () => {
            clearTimeout();
            setTimeout(this.updateWindowSize, 100);
        };

        const buttonRadius = "25%";
        const symbolStyle = {width: '50%', height: '50%', marginTop: '25%'};
        let buttonContainerStyle;
        let joystickContainerStyle;
        let buttonStyle;
        let joystickOptions;
        if (this.state.landscape) {
            joystickContainerStyle = {
                width: `${this.state.width / 2.1}px`,
                height: `${this.state.height}px`,
                float: 'left'
            };

            buttonContainerStyle = {
                width: `${this.state.width / 2.1}px`,
                height: `${this.state.height}px`,
                float: 'left'
            };

            buttonStyle = {
                marginTop: `${(this.state.height - (this.state.width * 0.15)) / 2}px`,
                marginLeft: '10%',
                justifyContent: 'center',
                fontSize: '8vw',
                width: `${this.state.width * 0.15}px`,
                height: `${this.state.width * 0.15}px`,
                float: 'left'
            };

            joystickOptions = {
                top: '50%',
                left: '25%',
                size: 300
            };
        } else {
            joystickContainerStyle = {
                width: `${this.state.width}px`,
                height: `${this.state.height * 0.8}px`
            };

            buttonContainerStyle = {
                width: `${this.state.width}px`,
                height: `${this.state.height * 0.2}px`,
                marginLeft: `${(this.state.width - (this.state.height * 0.36) - (this.state.width * 0.08)) / 2}px`
            };

            buttonStyle = {
                margin: `${this.state.width * 0.02}px`,
                justifyContent: 'center',
                fontSize: '8vw',
                width: `${this.state.height * 0.18}px`,
                height: `${this.state.height * 0.18}px`,
                float: 'left'
            };

            joystickOptions = {
                top: '50%',
                left: '50%',
                size: 200
            };
        }

        return (
            <Fragment>
                <div id="zone" style={joystickContainerStyle} className="JoystickContainer">
                    <Joystick onMove={this.handleJoystick}
                              onEnd={this.handleJoystickStop}
                              top={joystickOptions.top}
                              left={joystickOptions.left}
                              size={joystickOptions.size}/>
                </div>
                <div style={buttonContainerStyle} className="Buttons">
                    <div style={buttonStyle}  className="TurningButton"
                         onPointerDown={this.leftTurnDown} onPointerLeave={this.leftTurnUp} onPointerUp={this.leftTurnUp}>
                        <Button id="left-turn" borderRadius={buttonRadius}>
                            <RotateCcw className="unselectable" style={symbolStyle}/>
                        </Button>
                    </div>
                    <div style={buttonStyle}  className="TurningButton"
                         onPointerDown={this.rightTurnDown} onPointerLeave={this.rightTurnUp} onPointerUp={this.rightTurnUp}>
                        <Button id="left-turn" borderRadius={buttonRadius}>
                            <RotateCw className="unselectable" style={symbolStyle}/>
                        </Button>
                    </div>
                </div>
            </Fragment>
        );
    }
}