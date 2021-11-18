import React from 'react';
import Ic from './ic.js';
import './BtnCheckbox.css';

export default class BtnCheckbox extends React.Component {
  render() {
    return (
      <label className='btn-checkbox'>
        <input
          name={this.props.value}
          type='checkbox'
          {...(this.props.value && 'checked')}
          checked={this.props.value}
          onChange={this.props.onChange}
        />
        <Ic>{this.props.ic}</Ic>
      </label>
    );
  }
}
