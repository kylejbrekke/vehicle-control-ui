import React from 'react';

import JoystickControls from './ControlMethods/JoystickControls';
import DirectionalControls from './ControlMethods/DirectionalControls';
import Button from '../widgets/Buttons';
import colors from '../style/colors';

export default class ControllerPage extends React.Component {

    state = {
        directional: false,
        joystick: true
    };

    render() {
        let borderRadius = "100% 100% 100% 100% / 100% 100% 0% 0%";
        let toggleButtonTextStyle = { width: '100%', height: '50%', marginTop: '4vh', fontSize: '1.4em' };

        const pageStyle = {
            backgroundColor: colors.backgroundColor,
            height: '100vh',
            justifyContent: 'center',
            fontSize: 'calc(10px + 2vmin)',
            color: 'white',
            textAlign: 'center'
        };

        const controllerSelectStyle = {
            marginLeft: '7vw',
            height: '13.5vh'
        };

        const toggleButtonStyle = {
            position: 'relative',
            top: '0.5vh',
            border: 'none',
            marginRight: '1vw',
            fontSize: '1em',
            width: '42vw',
            height: '12vh',
            float: 'left'
        };

        const controllerRegionStyle = {
            overflow: 'auto',
            height: '80%',
            width: '100%',
            backgroundColor: colors.secondaryBackgroundColor
        };

        return(
          <div className="ControllerPage" style={pageStyle}>
                  <div className="ControllerSelect" style={controllerSelectStyle}>
                      <div className="unselectable" onPointerUp={() => this.toggle("joystick")} style={toggleButtonStyle}>
                          <Button id="joystick" borderRadius={borderRadius} isActive={this.state.joystick}>
                              <div style={toggleButtonTextStyle}>
                                  Joystick Controls
                              </div>
                          </Button>
                      </div>
                      <div className="unselectable" onPointerUp={() => this.toggle("directional")} style={toggleButtonStyle}>
                          <Button id="directional" borderRadius={borderRadius} isActive={this.state.directional}>
                              <div style={toggleButtonTextStyle}>
                                  Directional Buttons
                              </div>
                          </Button>
                      </div>
                  </div>
              <div id="container" className="ControllerRegion" style={controllerRegionStyle}>
                  {this.getControllerRegion()}
              </div>
          </div>
        );
    }

    toggle(id) {
        switch (id) {
            case "directional":
                console.log("directional");
                this.setState({directional: true, joystick: false});
                break;
            case "joystick":
            default:
                console.log("joystick");
                this.setState({directional: false, joystick: true});
                break;
        }
    }

    getControllerRegion() {
        if (this.state.directional) {
            return <DirectionalControls/>;
        } else {
            return <JoystickControls/>;
        }
    }
}