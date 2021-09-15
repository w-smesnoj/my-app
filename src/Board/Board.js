import React from 'react';
import './Board.css';

class Item extends React.Component {
  render() {
    const pos = {
      transform: `translate(${this.props.pos.x}px, ${this.props.pos.y}px)`,
    };
    return (
      <div
        style={{ ...pos, ...this.props.style }}
        className='item'
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

class ShapeItem extends React.Component {
  render() {
    const item = this.props.item;
    const style = item.shape;
    const shapeStyle = {
      border: `2px solid ${style.border}`,
      background: style.background,
      width: style.dim.w,
      height: style.dim.h,
    };
    return (
      <Item pos={item.pos} style={shapeStyle} onClick={this.props.onClick}>
        {this.props.children}
      </Item>
    );
  }
}

class Text extends React.Component {
  render() {
    const text = this.props.text;
    const style = text.style;
    const textStyle = {
      color: style.color ?? null,
      fontWeight: style.bold ? 'bold' : null,
      fontStyle: style.italic ? 'italic' : null,
      textDecoration: style.underline ? 'underline' : '',
    };
    const containerStyle = {
      alignItems: style.align,
      justifyItems: style.justify,
    };
    return (
      <div style={containerStyle} className='text-container'>
        <span style={textStyle}>{text.data}</span>
      </div>
    );
  }
}

class Line extends React.Component {
  render() {
    // const a = {
    //   x: 0,
    //   y: 0,
    // };
    // const b = {
    //   x: 100,
    //   y: 50,
    // };
    // const isHorizontal = true;
    // let start = `${a.x} ${a.y}`;
    // let end = `${b.x} ${b.y}`;

    // let horizontal = `${(b.x + a.x) / 2} ${a.y} ${(b.x + a.x) / 2} ${b.y}`;
    // let vertical = `${a.x} ${(b.y + a.y) / 2} ${b.x} ${(a.y + b.y) / 2}`;
    // let bezier = isHorizontal ? horizontal : vertical;
    // let path = `M ${start} C ${bezier}, ${end}`;
    // console.log(path);
    // this.node.setAttribute('d', `M ${start} ${bezier}, ${end}`);

    const connection = this.props.connection;

    const path = connection.path;

    return (
      <line
        onClick={this.props.onClick}
        x1={path.from.pos.x}
        y1={path.from.pos.y}
        x2={path.to.pos.x}
        y2={path.to.pos.y}
        style={connection.style}
      />
    );
  }
}

// class Line extends React.Component {
//   render() {
//     const a = {
//       x: 0,
//       y: 0,
//     };
//     const b = {
//       x: 100,
//       y: 50,
//     };
//     const isHorizontal = true;
//     let start = `${a.x} ${a.y}`;
//     let end = `${b.x} ${b.y}`;

//     let horizontal = `${(b.x + a.x) / 2} ${a.y} ${(b.x + a.x) / 2} ${b.y}`;
//     let vertical = `${a.x} ${(b.y + a.y) / 2} ${b.x} ${(a.y + b.y) / 2}`;
//     let bezier = isHorizontal ? horizontal : vertical;
//     let path = `M ${start} C ${bezier}, ${end}`;
//     console.log(path);
//     // this.node.setAttribute('d', `M ${start} ${bezier}, ${end}`);

//     return (
//       <svg
//         style={{
//           width: '100px',
//           height: '100px',
//         }}
//       >
//         <path
//           d={path}
//           style={{
//             stroke: '#2b78e4',
//             strokeWidth: '3px',
//             fill: 'transparent',
//           }}
//         ></path>
//       </svg>
//     );
//   }
// }

class ItemEditor extends React.Component {
  render() {
    if (!this.props.item) return <div></div>;
    const item = this.props.item;
    const pos = item.pos;
    const style = item.content.text.style;

    const change = this.props.handleChange;

    console.log(item);

    return (
      <div>
        <div
          style={{
            transform: `translate(${pos.x + item.shape.dim.w / 2}px,${
              pos.y
            }px) translateX(-50%) translateY(-180%)`,
          }}
          className='item-editor'
        >
          <input
            onChange={(e) => {
              change({ type: 'data', data: e.target.value });
            }}
            value={item.content.text.data}
          />
          <button onClick={(e) => change({ type: 'bold' })}>
            B {style.bold.toString()}
          </button>
          <button onClick={(e) => change({ type: 'italic' })}>
            I {style.italic.toString()}
          </button>
          <button onClick={(e) => change({ type: 'underline' })}>
            U {style.underline.toString()}
          </button>
        </div>
        <div
          className='item-indicator'
          style={{
            transform: `translate(${pos.x}px,${pos.y}px)`,
            width: `${item.shape.dim.w}px`,
            height: `${item.shape.dim.h}px`,
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
      items: [
        {
          ID: 0,
          shape: {
            border: 'black',
            background: '#FEF445',
            dim: {
              w: 100,
              h: 50,
            },
          },
          content: {
            text: {
              data: 'lorem',
              style: {
                color: 'black',
                bold: false,
                italic: false,
                underline: false,
                align: 'center',
                justify: 'center',
              },
            },
          },
          pos: {
            x: 150,
            y: 100,
          },
        },
        {
          ID: 1,
          shape: {
            border: 'black',
            background: '#F5E197',
            dim: {
              w: 200,
              h: 50,
            },
          },
          content: {
            text: {
              data: 'ipsun',
              style: {
                color: 'black',
                bold: false,
                italic: false,
                underline: false,
                align: 'center',
                justify: 'center',
              },
            },
          },
          pos: {
            x: 500,
            y: 300,
          },
        },
      ],
      connections: [
        {
          ID: 2,
          path: {
            from: {
              pos: {
                x: 50,
                y: 50,
              },
            },
            to: {
              pos: {
                x: 150,
                y: 150,
              },
            },
          },
          style: {
            stroke: 'black',
            strokeWidth: '2',
          },
        },
      ],
      focusedItem: null,
    };
  }

  handleClickBoard(e) {}

  focusItem(e, item) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      focusedItem: item,
    });
  }

  handleChange(e) {
    const items = [...this.state.items];
    const i = items.findIndex((item) => item.ID === this.state.focusedItem.ID);

    let text = items[i].content.text;
    const style = text.style;

    switch (e.type) {
      case 'bold':
        style.bold = !style.bold;
        break;
      case 'italic':
        style.italic = !style.italic;
        break;
      case 'underline':
        style.underline = !style.underline;
        break;
      case 'data':
        text.data = e.data;
        break;
      default:
        return;
    }
    this.setState({ items });
  }

  render() {
    let items = [];
    this.myRef = React.createRef();
    this.state.items.forEach((item) => {
      if (item.shape === undefined) return;
      items.push(
        <ShapeItem
          item={item}
          onClick={(e) => this.focusItem(e, item)}
          key={item.ID}
        >
          <Text text={item.content.text}></Text>
        </ShapeItem>
      );
    });

    let connections = [];

    this.state.connections.forEach((connection) => {
      connections.push(
        <Line
          connection={connection}
          onClick={(e) => this.focusItem(e, connection)}
        ></Line>
      );
    });
    return (
      <div>
        <div className='board' onClick={(e) => this.handleClickBoard(e)}>
          <ItemEditor
            item={this.state.focusedItem}
            handleChange={(e) => this.handleChange(e, this.state.focusedItem)}
          />
          {items}
          <svg>{connections}</svg>
        </div>
      </div>
    );
  }
}
