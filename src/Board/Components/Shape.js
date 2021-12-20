import React from 'react';
import './Shape.css';
import hexToHsl from 'hex-to-hsl';

export default class Shape extends React.Component {
  handleContentChange(e) {
    this.props.onChangeText(e.currentTarget.textContent);
  }
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
        color: textConfig.color,
      };
    }
    let shapeStyle;
    const borderSizeScale = [0, 1, 2, 4, 7, 10, 14, 19, 26];
    const hsl = hexToHsl(cfg.style.borderColor);
    const borderOpacity = cfg.style.borderOpacity * 10;
    let borderColor = `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}% / ${borderOpacity}%)`;
    if (cfg.style) {
      shapeStyle = {
        boxShadow: `inset 0px 0px 0px ${
          borderSizeScale[cfg.style.borderSize]
        }px ${borderColor}`,
        background: cfg.style.backgroundColor,
        opacity: `${cfg.style.opacity * 10}%`,
      };
    }

    return (
      <div
        id={this.props.id}
        style={{ ...shapeDimensions, ...shapeStyle, ...textStyle }}
        // ref={this.props.setRef}
        onClick={this.props.onClick}
        className='shape'
        contentEditable={this.props.editingText}
        onInput={(e) => this.handleContentChange(e)}
      >
        {cfg?.text?.data}
      </div>
    );
  }
}
