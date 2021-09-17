import React from 'react';
import './Board.css';
import { items } from './itemConfig.js';

class Shape extends React.Component {
  render() {
    const cfg = this.props.config;
    const shapeStyle = {
      background: '#febd45',
      width: cfg.dim.w,
      height: cfg.dim.h,
      transform: `translate(${cfg.pos.x}px, ${cfg.pos.y}px) translate(-50%, -50%)`,
    };
    return <div style={shapeStyle}></div>;
  }
}

class Connection extends React.Component {
  render() {
    const cfg = this.props.config;
    return (
      <line
        x1={cfg.from.pos.x}
        y1={cfg.from.pos.y}
        x2={cfg.to.pos.x}
        y2={cfg.to.pos.y}
        style={{
          stroke: 'black',
        }}
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

  moveShape() {
    let itemArray = [...this.state.items];
    let box2 = itemArray[1];
    box2.pos.x = box2.pos.x + 10;
    this.setState({
      items: itemArray,
    });
  }

  render() {
    let shapes = [];
    let smartConnections = [];

    this.state.items.forEach((item) => {
      switch (item.type) {
        case 'shape':
          shapes.push(<Shape config={item} key={item.id} />);
          break;
        case 'smart-connection':
          const from = this.state.items.find((i) => i.id === item.from.id);
          const to = this.state.items.find((i) => i.id === item.to.id);
          item.from.pos = from.pos;
          item.to.pos = to.pos;
          smartConnections.push(<Connection config={item} key={item.id} />);
          break;
        default:
          break;
      }
    });

    return (
      <div>
        <div className='board'>
          {shapes}
          <svg>{smartConnections}</svg>
        </div>
        <button onClick={() => this.moveShape()}>Move 10px</button>
      </div>
    );
  }
}
