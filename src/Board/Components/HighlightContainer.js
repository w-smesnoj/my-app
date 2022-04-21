import React from 'react';
// import './ItemEditor.css';
// import BtnRadio from './BtnRadio.js';

export default class HighlightContainer extends React.Component {
  render() {
    const { offset, area } = this.props;
    return (
      <div
        className={'highlight-container'}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          width: `${area.w}px`,
          height: `${area.h}px`,
        }}
      ></div>
    );
  }
}
