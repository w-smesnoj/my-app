import React from 'react';
import './ItemEditor.css';
import Ic from './ic.js';
import Io from './io.js';

export default class BarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }
  render() {
    const iconStyle = { color: this.props.iconColor };

    return (
      <div>
        <button onClick={(e) => this.toggleVisibility()}>
          {this.props.ic ? <Ic style={iconStyle}>{this.props.ic}</Ic> : null}
          {this.props.io ? <Io style={iconStyle}>{this.props.io}</Io> : null}
        </button>
        {this.state.visible ? (
          <div className={`context control-groups ${this.props.className}`}>
            {this.props.children}
          </div>
        ) : null}
      </div>
    );
  }
}
