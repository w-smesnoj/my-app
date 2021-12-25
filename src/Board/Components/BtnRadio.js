import React from 'react';
import Ic from './ic.js';
import Io from './io.js';
import './BtnRadio.css';

export default class BtnRadio extends React.Component {
  render() {
    return (
      <label className='btn-radio' style={this.props.style}>
        <input
          name={this.props.name.toString()}
          type='radio'
          value={this.props.value}
          onChange={this.props.onChange}
          checked={this.props.checked}
        />
        {this.props.ic ? <Ic>{this.props.ic}</Ic> : null}
        {this.props.io ? <Io>{this.props.io}</Io> : null}
      </label>
    );
  }
}
