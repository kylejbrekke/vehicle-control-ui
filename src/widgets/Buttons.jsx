import React from 'react';
import colors from '../style/colors';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            borderRadius: props.borderRadius ? props.borderRadius : '0%'
        };
    }

    onDown = event => {
        this.setState({ isActive: true });
        return event;
    };

    onUp = event => {
        this.setState({ isActive: false });
        return event;
    };

    render() {
        const { isActive } = this.state;
        const style = {
            backgroundColor: isActive ?  colors.widgetColor : colors.backgroundColor,
            color: isActive ? colors.backgroundColor : colors.widgetColor,
            borderColor: colors.widgetColor,
            borderStyle: 'solid',
            borderRadius: this.state.borderRadius,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            justifyContent: 'center',
            textAlign: 'center'
        };

        return (
            <div className="unselectable"
                 onPointerDown={this.onDown}
                 onPointerUp={this.onUp}
                 style={style}>
                {this.props.children}
            </div>
        );
    }
}