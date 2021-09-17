import { render } from '@testing-library/react';
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
    return (
      <div
        style={shapeStyle}
        ref={this.props.setRef}
        onClick={this.props.onClick}
      ></div>
    );
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
          strokeWidth: '3px',
        }}
        ref={this.props.setRef}
        onClick={this.props.onClick}
      />
    );
  }
}

class ItemEditor extends React.Component {
  render() {
    if (this.props.item.ref === undefined) return <div></div>;
    const ref = this.props.item.ref.getBoundingClientRect();
    console.log(ref.x);
    return (
      <div
        className='highlight-container'
        style={{
          width: `${ref.width}px`,
          height: `${ref.height}px`,
          transform: `translate(${ref.x}px,${ref.y}px)`,
        }}
      ></div>
    );
  }
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      focusedItem: {
        item: null,
        txt: null,
      },
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
  focusItem(e, item, ref) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      focusedItem: {
        item: item,
        ref: ref.current,
      },
    });
  }
  render() {
    let shapes = [];
    let smartConnections = [];

    this.state.items.forEach((item) => {
      const ref = React.createRef();
      switch (item.type) {
        case 'shape':
          shapes.push(
            <Shape
              config={item}
              key={item.id}
              setRef={ref}
              onClick={(e) => this.focusItem(e, item, ref)}
            />
          );
          break;
        case 'smart-connection':
          const from = this.state.items.find((i) => i.id === item.from.id);
          const to = this.state.items.find((i) => i.id === item.to.id);
          item.from.pos = from.pos;
          item.to.pos = to.pos;
          smartConnections.push(
            <Connection
              config={item}
              key={item.id}
              setRef={ref}
              onClick={(e) => this.focusItem(e, item, ref)}
            />
          );
          break;
        default:
          break;
      }
    });

    return (
      <div>
        <ItemEditor item={this.state.focusedItem} />
        <div className='board'>
          {shapes}
          <svg>{smartConnections}</svg>
        </div>
        <button onClick={() => this.moveShape()}>Move 10px</button>
      </div>
    );
  }
}
