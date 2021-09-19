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
    const ref = this.props.item.ref.getBoundingClientRect();

    const x = ref.x + ref.width / 2;
    const y = ref.y;
    const transform = `translate(${x}px,${y}px) translate(-50%, -50%) translateY(-2.7rem)`;

    const change = this.props.handleChange;

    return (
      <div>
        <div className='editor' style={{ transform: transform }}>
          <button onClick={(e) => change({ type: 'bold' })}>B</button>
        </div>
        <div
          className='highlight-container'
          style={{
            width: `${ref.width}px`,
            height: `${ref.height}px`,
            transform: `translate(${ref.x}px,${ref.y}px)`,
          }}
        ></div>
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
        default:
          break;
      }
    });

    return (
      <div>
        <ItemEditor
          item={this.state.focusedItem}
          handleChange={(e) => this.handleChange(e, this.state.focusedItem)}
        />
        <div className='board'>
          {shapes}
          <svg onClick={(e) => this.clearFocus(e)}>{smartConnections}</svg>
        </div>
        <button onClick={() => this.moveShape()}>Move 10px</button>
      </div>
    );
  }
}
