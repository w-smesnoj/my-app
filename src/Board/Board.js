import React from 'react';
import './Board.css';
import { items } from './itemConfig.js';

class Shape extends React.Component {
  render() {
    const config = this.props.config;
    const shapeStyle = {
      background: '#febd45',
      width: config.dim.w,
      height: config.dim.h,
      transform: `translate(${config.pos.x}px, ${config.pos.y}px)`,
    };
    return <div style={shapeStyle} ref={this.props.onRef}></div>;
  }
}

class Connection extends React.Component {
  render() {
    const config = this.props.config;
    const path = config.path;

    return (
      <line
        onClick={this.props.onClick}
        x1={path.from.pos.x}
        y1={path.from.pos.y}
        x2={path.to.pos.x}
        y2={path.to.pos.y}
        style={config.style}
      />
    );
  }
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
    };
  }

  render() {
    let shapes = [];
    let connections = [];

    this.state.items.forEach((item) => {
      switch (item.type) {
        case 'shape':
          shapes.push(<Shape config={item} key={item.ID} />);
          break;
        case 'connection':
          connections.push(<Connection config={item} key={item.ID} />);
          break;
        default:
          break;
      }
    });

    return (
      <div>
        <div className='board'>
          {shapes}
          <svg>{connections}</svg>
        </div>
      </div>
    );
  }
}
