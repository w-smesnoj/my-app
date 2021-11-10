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

    const textConfig = cfg?.text?.style;
    let textStyle;
    if (textConfig) {
      const align = {
        left: 'start',
        top: 'start',
        center: 'center',
        right: 'end',
        bottom: 'end',
      };

      const underline = textConfig.underline ? 'underline' : '';
      const strikethrough = textConfig.strikethrough ? 'line-through' : '';
      textStyle = {
        fontWeight: textConfig.bold ? 'bold' : null,
        textDecoration: `${underline} ${strikethrough}`,
        fontStyle: textConfig.italic ? 'italic' : null,
        fontSize: `${textConfig.fontSize}px`,
        fontFamily: textConfig.fontFamily,
        justifyContent: align[textConfig.align],
        alignItems: align[textConfig.alignVertical],
      };
    }
    let shapeStyle;
    if (cfg.style) {
      shapeStyle = {
        boxShadow: `inset 0px 0px 0px 2px ${cfg.style.borderColor}`,
        background: cfg.style.backgroundColor,
      };
    }

    return (
      <div
        id={this.props.id}
        style={{ ...shapeDimensions, ...shapeStyle, ...textStyle }}
        ref={this.props.setRef}
        onClick={this.props.onClick}
        className='shape'
      >
        {cfg?.text?.data}
      </div>
    );
  }
}
