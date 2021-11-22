import React from 'react';
import './ColorPalette.css';
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
        '#fbbf23',
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
          ? 'white 0px 0px 0px 1.5px, 0px 0px 0px 3.5px rgb(83 153 238), inset 0px 0px 0px 1px #00000021'
          : 'inset 0px 0px 0px 1px #00000021';

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
