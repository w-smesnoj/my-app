import React from 'react';
// import './ItemEditor.css';
// import BtnRadio from './BtnRadio.js';

export default class ContainerIndicator extends React.Component {
  render() {
    const { offset, area } = this.props;
    return (
      <div
        className={'selection-container'}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          width: `${area.w}px`,
          height: `${area.h}px`,
        }}
      ></div>
    );
  }
}

// <BtnRadio
// name={this.props.name}
// io={this.props.io}
// ic={this.props.ic}
// value={this.props.value}
// checked={this.props.value === this.props.comp}
// onChange={this.props.onChange}
// style={{ color: this.props.iconColor }}
// />
// {this.props.value === this.props.comp ? (
// <div
//   className={`context control-groups main ${this.props?.className}`}
// >
//   {this.props.children}
// </div>
// ) : null}
