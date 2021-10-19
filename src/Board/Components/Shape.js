import React from 'react';
import './Shape.css';

export default class Shape extends React.Component {
  render() {
    const cfg = this.props.config;
    const shapeDimensions = {
      width: cfg.dim.w,
      height: cfg.dim.h,
      transform: `translate(${cfg.pos.x}px, ${cfg.pos.y}px) `,
    };
    const textStyle = cfg.text.style;
    const underline = textStyle.underline ? 'underline' : '';
    const strikethrough = textStyle.strikethrough ? 'line-through' : '';

    const align = {
      left: 'start',
      top: 'start',
      center: 'center',
      right: 'end',
      bottom: 'end',
    };
    const style = {
      fontWeight: textStyle.bold ? 'bold' : null,
      textDecoration: `${underline} ${strikethrough}`,
      fontStyle: textStyle.italic ? 'italic' : null,
      fontSize: textStyle.fontSize,
      boxShadow: `inset 0px 0px 0px 2px ${cfg.style.borderColor}`,
      background: cfg.style.backgroundColor,
      justifyContent: align[textStyle.align],
      alignItems: align[textStyle.alignVertical],
    };
    return (
      <div
        id={this.props.id}
        style={{ ...shapeDimensions, ...style }}
        ref={this.props.setRef}
        onClick={this.props.onClick}
        className='shape'
      >
        {cfg.text.data}
      </div>
    );
  }
}
