import React from 'react';
import './ColorPalette.css';
import Ic from './ic.js';
export default class ColorPalette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [
        '#f9fafc',
        '#d2d5dc',
        '#6b7380',
        '#27262b',
        '#f87070',
        '#fc923c',
        '#FBBF23',
        '#facc16',
        '#a3e636',
        '#4ade80',
        '#34d399',
        '#2dd4c0',
        '#21d3ed',
        '#38bdf8',
        '#61a5fa',
        '#818cf8',
        '#a78bfa',
        '#c085fd',
        '#e879f9',
        '#f572b6',
        '#fef72f',
        '#f7df97',
      ],
      selected: null,
    };
  }
  render() {
    const colors = this.state.colors.map((color) => {
      const selected =
        this.props.selectedColor === color.toLowerCase()
          ? "boxShadow: '#5399ee 0px 0px 0px 2px'"
          : null;
      return (
        <button
          style={{
            backgroundColor: color,
            boxShadow: selected,
          }}
          onClick={() => this.props.onColorChange(color)}
          key={color}
        ></button>
      );
    });

    return <div className='color-palette'>{colors}</div>;
  }
}
