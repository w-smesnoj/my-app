import React from 'react';
import './Shape.css';

export default class Shape extends React.Component {
  render() {
    const cfg = this.props.config;
    const shapeStyle = {
      width: cfg.dim.w,
      height: cfg.dim.h,
      transform: `translate(${cfg.pos.x}px, ${cfg.pos.y}px) `,
    };
    const style = {
      fontWeight: cfg.text.bold ? 'bold' : null,
    };
    return (
      <div
        id={this.props.id}
        style={{ ...shapeStyle, ...style }}
        ref={this.props.setRef}
        onClick={this.props.onClick}
        className={`shape ${cfg.className}`}
      >
        {cfg.text.data}
      </div>
    );
  }
}
