import React from 'react';
import { Fragment } from 'react';
import { ArrowLeft, ArrowUp, ArrowRight, ArrowDown, RotateCcw, RotateCw } from 'react-feather';


import Button from '../../widgets/Buttons';
import drive from '../../communication/drive';

export default class DirectionalControls extends React.Component {
    state = {
        height: 0,
        width: 0,
        landscape: true,
        down: false,
        up: false,
        right: false,
        left: false,
        turnLeft: false,
        turnRight: false
    };

    componentDidMount() {
        this.upDown = this.upDown.bind(this);
        this.upUp = this.upUp.bind(this);
        this.downDown = this.downDown.bind(this);
        this.downUp = this.downUp.bind(this);
        this.leftDown = this.leftDown.bind(this);
        this.leftUp = this.leftUp.bind(this);
        this.rightDown = this.rightDown.bind(this);
        this.rightUp = this.rightUp.bind(this);
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

    updateWindowSize() {
        this.setState({
            height: document.getElementById("container").offsetHeight,
            width: document.getElementById("container").offsetWidth,
            landscape: window.innerHeight < window.innerWidth
        });
    }

    driveCommand = () => {
        if ((this.state.up && this.state.down) || (this.state.right && this.state.left) || (this.state.turnLeft && this.state.turnRight)) {
            console.log('CONFLICT: No Motion');
            return {
                sideTrack: 0,
                leftTrack: 0,
                rightTrack: 0
            };
        }

        if (this.state.up) {
            if (this.state.left) {
                console.log('up left');
                return {
                    sideTrack: -Math.sqrt(2) / 2,
                    leftTrack: Math.sqrt(2) / 2,
                    rightTrack: Math.sqrt(2) / 2
                };
            } else if (this.state.right) {
                console.log('up right');
                return {
                    sideTrack: Math.sqrt(2) / 2,
                    leftTrack: Math.sqrt(2) / 2,
                    rightTrack: Math.sqrt(2) / 2
                };
            } else if (this.state.turnLeft) {
                console.log('up left-turn');
                return {
                    sideTrack: 0,
                    leftTrack: 1 / 2,
                    rightTrack: 1
                };
            } else if (this.state.turnRight) {
                console.log('up right-turn');
                return {
                    sideTrack: 0,
                    leftTrack: 1,
                    rightTrack: 1 / 2
                };
            } else {
                console.log('up');
                return {
                    sideTrack: 0,
                    leftTrack: 1,
                    rightTrack: 1
                };
            }
        } else if (this.state.down) {
            if (this.state.left) {
                console.log('down left');
                return {
                    sideTrack: -Math.sqrt(2) / 2,
                    leftTrack: -Math.sqrt(2) / 2,
                    rightTrack: -Math.sqrt(2) / 2
                };
            } else if (this.state.right) {
                console.log('down right');
                return {
                    sideTrack: Math.sqrt(2) / 2,
                    leftTrack: -Math.sqrt(2) / 2,
                    rightTrack: -Math.sqrt(2) / 2
                };
            } else if (this.state.turnLeft) {
                console.log('down turn-left');
                return {
                    sideTrack: 0,
                    leftTrack: -1 / 2,
                    rightTrack: -1
                };
            } else if (this.state.turnRight) {
                console.log('down turn-right');
                return {
                    sideTrack: 0,
                    leftTrack: -1,
                    rightTrack: -1 / 2
                };
            } else {
                console.log('down');
                return {
                    sideTrack: 0,
                    leftTrack: -1,
                    rightTrack: -1
                };
            }
        } else if (this.state.left) {
            if (this.state.turnLeft) {
                console.log('left turn-left');
                return {
                    sideTrack: -1,
                    leftTrack: -1,
                    rightTrack: 1
                };
            } else if (this.state.turnRight) {
                console.log('left turn-right');
                return {
                    sideTrack: -1,
                    leftTrack: 1,
                    rightTrack: -1
                };
            } else {
                console.log('left');
                return {
                    sideTrack: -1,
                    leftTrack: 0,
                    rightTrack: 0
                };
            }
        } else if (this.state.right) {
            if (this.state.turnLeft) {
                console.log('right turn-left');
                return {
                    sideTrack: 1,
                    leftTrack: -1,
                    rightTrack: 1
                };
            } else if (this.state.turnRight) {
                console.log('right turn-right');
                return {
                    sideTrack: 1,
                    leftTrack: 1,
                    rightTrack: -1
                };
            } else {
                console.log('right');
                return {
                    sideTrack: 1,
                    leftTrack: 0,
                    rightTrack: 0
                };
            }
        } else if (this.state.turnLeft) {
            console.log('turn-left');
            return {
                leftTrack: -1,
                rightTrack: 1
            };
        } else if (this.state.turnRight) {
            console.log('turn-right');
            return {
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

    leftDown() {
        this.setState({left: true})
    }

    leftUp() {
        this.setState({left: false})
    }

    rightDown() {
        this.setState({right: true})
    }

    rightUp() {
        this.setState({right: false})
    }

    upDown() {
        this.setState({up: true})
    }

    upUp() {
        this.setState({up: false})
    }

    downDown() {
        this.setState({down: true})
    }

    downUp() {
        this.setState({down: false})
    }

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

    render() {
        window.onresize = () => {
            clearTimeout();
            setTimeout(this.updateWindowSize, 100);
        };

        const buttonRadius = "25%";
        const symbolStyle = {width: '50%', height: '50%', marginTop: '25%'};

        if (this.state.landscape) {
            const scale = (this.state.height / 2) > (this.state.width / 3) ? this.state.width / 3.3 : this.state.height / 2.2;
            const offset = (this.state.height / 2) > (this.state.width / 3)
                ? this.state.width - (this.state.width * (3/3.3)) : this.state.width - (this.state.height * (3/2.2));

            const buttonStyle = {
                height: `${scale * 0.98}px`,
                width: `${scale * 0.98}px`,
                margin: `${scale * 0.03}px`,
                textAlign: 'center',
                justifyContent: 'center',
                float: 'left'
            };

            const rowStyle = {
                height: '48%',
                marginLeft: `${offset / 2.2}px`,
                marginTop: '0.5%',
                width: `${this.state.width - (offset / 2.2)}px`
            };

            return (
                <Fragment>
                    <div style={rowStyle} className={"TopRow"}>
                        <div style={buttonStyle}  className="TurningButton"
                            onPointerDown={this.leftTurnDown} onPointerLeave={this.leftTurnUp} onPointerUp={this.leftTurnUp}>
                            <Button id="left-turn" borderRadius={buttonRadius}>
                                <RotateCcw className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.upDown} onPointerLeave={this.upUp} onPointerUp={this.upUp}>
                            <Button id="up" borderRadius={buttonRadius}>
                                <ArrowUp className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="TurningButton"
                             onPointerDown={this.rightTurnDown} onPointerLeave={this.rightTurnUp} onPointerUp={this.rightTurnUp}>
                            <Button id="right-turn" borderRadius={buttonRadius}>
                                <RotateCw className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                    </div>
                    <div style={rowStyle} className="BottomRow">
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.leftDown} onPointerLeave={this.leftUp} onPointerUp={this.leftUp}>
                            <Button id="left" borderRadius={buttonRadius}>
                                <ArrowLeft className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.downDown} onPointerLeave={this.downUp} onPointerUp={this.downUp}>
                            <Button id="down" borderRadius={buttonRadius}>
                                <ArrowDown className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.rightDown} onPointerLeave={this.rightUp} onPointerUp={this.rightUp}>
                            <Button id="right" borderRadius={buttonRadius}>
                                <ArrowRight className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            const scale = (this.state.width / 2) > (this.state.height / 3) ? this.state.height / 3.3 : this.state.width / 2.2;
            const offset = (this.state.width / 2) > (this.state.height / 3)
                ? this.state.width - (this.state.height * (2/3.3)) : this.state.width - (this.state.width * (2/2.2));

            const buttonStyle = {
                height: `${scale}px`,
                width: `${scale}px`,
                margin: `${scale * 0.02}px`,
                textAlign: 'center',
                justifyContent: 'center',
                float: 'left'
            };

            const rowStyle = {
                height: '30%',
                marginLeft: `${offset / 2.1}px`,
                width: `${this.state.width - (offset / 2.1)}px`
            };

            return (
                <Fragment>
                    <div style={rowStyle} className={"TopRow"}>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.leftTurnDown} onPointerLeave={this.leftTurnUp} onPointerUp={this.leftTurnUp}>
                            <Button id="left-turn" borderRadius={buttonRadius}>
                                <RotateCcw className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.rightTurnDown} onPointerLeave={this.rightTurnUp} onPointerUp={this.rightTurnUp}>
                            <Button id="right-turn" borderRadius={buttonRadius}>
                                <RotateCw className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                    </div>
                    <div style={rowStyle} className="MidRow">
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.upDown} onPointerLeave={this.upUp} onPointerUp={this.upUp}>
                            <Button id="up" borderRadius={buttonRadius}>
                                <ArrowUp className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.downDown} onPointerLeave={this.downUp} onPointerUp={this.downUp}>
                            <Button id="down" borderRadius={buttonRadius}>
                                <ArrowDown className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                    </div>
                    <div style={rowStyle} className="BottomRow">
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.leftDown} onPointerLeave={this.leftUp} onPointerUp={this.leftUp}>
                            <Button id="left" borderRadius={buttonRadius}>
                                <ArrowLeft className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                        <div style={buttonStyle}  className="DirectionalButton"
                             onPointerDown={this.rightDown} onPointerLeave={this.rightUp} onPointerUp={this.rightUp}>
                            <Button id="right" borderRadius={buttonRadius}>
                                <ArrowRight className="unselectable" style={symbolStyle}/>
                            </Button>
                        </div>
                    </div>
                </Fragment>
            );
        }
    }
}