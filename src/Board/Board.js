import React from 'react';
import './Board.css';
import { items } from './itemConfig.js';
import Draggable from 'react-draggable';

class Shape extends React.Component {
  render() {
    const cfg = this.props.config;
    const shapeStyle = {
      background: '#febd45',
      width: cfg.dim.w,
      height: cfg.dim.h,
      transform: `translate(${cfg.pos.x}px, ${cfg.pos.y}px) `,
    };
    const style = {
      fontWeight: cfg.text.bold ? 'bold' : null,
    };
    return (
      <div
        style={{ ...shapeStyle, ...style }}
        ref={this.props.setRef}
        onClick={this.props.onClick}
      >
        {cfg.text.data}
      </div>
    );
  }
}

class SmartBezier extends React.Component {
  offsetPoints(e, at) {
    const pos = e.pos;
    const dim = e.dim;

    if (at === 'south') {
      return { x: pos.x + dim.w / 2, y: pos.y + dim.h };
    } else if (at === 'north') {
      return { x: pos.x + dim.w / 2, y: pos.y };
    } else if (at === 'west') {
      return { x: pos.x, y: pos.y + dim.h / 2 };
    } else if (at === 'east') {
      return { x: pos.x + dim.w, y: pos.y + dim.h / 2 };
    } else {
      // center
      return { x: pos.x + dim.w / 2, y: pos.y + dim.h / 2 };
    }
  }

  determineOrientation(A, B, callback) {
    let deg = this.cordToDeg(A, B);

    if (deg > 135 && deg < 225) {
      callback.west();
    } else if (deg > 315 || deg < 45) {
      callback.east();
    } else if (deg > 225 && deg < 315) {
      callback.north();
    } else {
      callback.south();
    }
  }

  cordToDeg(A, B) {
    let rad = Math.atan2(A.y - B.y, A.x - B.x);
    rad = rad < 0 ? rad + 2 * Math.PI : rad;
    return rad * (180 / Math.PI);
  }

  render() {
    const A = this.props.from;
    const B = this.props.to;
    let isHorizontal = false;
    let a = {},
      b = {};

    this.determineOrientation(
      this.offsetPoints(A, 'center'),
      this.offsetPoints(B, 'center'),
      {
        west: () => {
          isHorizontal = true;
          a.at = 'east';
          b.at = 'west';
        },
        east: () => {
          a.at = 'west';
          b.at = 'east';
          isHorizontal = true;
        },
        north: () => {
          a.at = 'south';
          b.at = 'north';
        },
        south: () => {
          a.at = 'north';
          b.at = 'south';
        },
      }
    );

    a = this.offsetPoints(A, a.at);
    b = this.offsetPoints(B, b.at);

    let start = `${a.x} ${a.y}`;
    let end = `${b.x} ${b.y}`;

    let horizontal = `C ${(b.x + a.x) / 2} ${a.y} ${(b.x + a.x) / 2} ${b.y}`;
    let vertical = `C ${a.x} ${(b.y + a.y) / 2} ${b.x} ${(a.y + b.y) / 2}`;
    let bezier = isHorizontal ? horizontal : vertical;

    return (
      <path
        d={`M ${start} ${bezier}, ${end}`}
        ref={this.props.setRef}
        onClick={this.props.onClick}
      ></path>
    );
  }
}

class SmartConnection extends React.Component {
  render() {
    const from = this.props.items.find((i) => i.id === this.props.from);
    const to = this.props.items.find((i) => i.id === this.props.to);

    return (
      <Connection
        from={from.pos}
        to={to.pos}
        setRef={this.props.setRef}
        onClick={this.props.onClick}
      />
    );
  }
}

class Connection extends React.Component {
  render() {
    const from = this.props.from;
    const to = this.props.to;
    return (
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
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

    const item = this.props.item.item;
    const x = item.pos.x + item.dim.w / 2;
    const y = item.pos.y;
    const transform = `translate(${x}px,${y}px) translate(-50%, -50%) translateY(-2.7rem)`;

    const change = this.props.handleChange;

    return (
      <div>
        <div className='editor' style={{ transform: transform }}>
          <button onClick={(e) => change({ type: 'bold' })}>B</button>
        </div>
        <Draggable
          position={item.pos}
          grid={[25, 25]}
          scale={1}
          onStop={this.props.handleDrag}
        >
          <div
            className='highlight-container'
            style={{
              width: `${item.dim.w}px`,
              height: `${item.dim.h}px`,
            }}
          ></div>
        </Draggable>
      </div>
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

  clearFocus(e) {
    if (e.currentTarget !== e.target) return;
    this.setState({
      focusedItem: {
        item: null,
        txt: null,
      },
    });
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

  handleChange(e) {
    const items = [...this.state.items];
    const item = items.find(
      (item) => item.id === this.state.focusedItem.item.id
    );

    switch (e.type) {
      case 'bold':
        item.text.bold = !item.text.bold;
        break;
      default:
        return;
    }
    this.setState({ items });
  }
  handleDrag(e) {
    const items = [...this.state.items];
    const item = items.find(
      (item) => item.id === this.state.focusedItem.item.id
    );
    item.pos = {
      x: e.clientX - e.offsetX,
      y: e.clientY - e.offsetY,
    };
    this.setState({ items });
  }

  render() {
    let shapes = [];
    let smartConnections = [];
    let smartBezier = [];

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
          smartConnections.push(
            <SmartConnection
              from={item.from.id}
              to={item.to.id}
              key={item.id}
              items={this.state.items}
              setRef={ref}
              onClick={(e) => this.focusItem(e, item, ref)}
            />
          );
          break;
        case 'smart-bezier':
          const A = this.state.items.find((i) => i.id === item.from.id);
          const B = this.state.items.find((i) => i.id === item.to.id);
          smartBezier.push(
            <SmartBezier
              from={A}
              to={B}
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
        <ItemEditor
          item={this.state.focusedItem}
          handleChange={(e) => this.handleChange(e, this.state.focusedItem)}
          handleDrag={(e) => this.handleDrag(e)}
        />
        <div className='board'>
          {shapes}
          <svg onClick={(e) => this.clearFocus(e)}>
            {smartConnections}
            {smartBezier}
          </svg>
        </div>
        <button onClick={() => this.moveShape()}>Move 10px</button>
      </div>
    );
  }
}
