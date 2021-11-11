import React from 'react';
import './Slider.css';

export default class Slider extends React.Component {
  render() {
    return (
      <div className='slider'>
        <input
          type='range'
          id={this.props.label}
          name={this.props.label}
          min={this.props.vals[0]}
          max={this.props.vals[1]}
          value={this.props.val}
          onChange={this.props.onChange}
        ></input>
        <label for={this.props.label}>{this.props.label}</label>
        <span>{this.props.val}</span>
      </div>
    );
  }
}
