import React from 'react';
import './Board.css';

class Item extends React.Component {
  render() {
    const pos = this.props.pos;
    return (
      <div
        style={{ transform: `translate(${pos.x}px,${pos.y}px)` }}
        className='item'
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    const cfg = this.props.config;

    const shape = cfg?.shape;
    const styleShape = shape
      ? {
          outline: shape?.border ? ` 1px solid ${shape?.border}` : '',
          background: shape?.background,
          width: shape.dim?.w ?? '',
          height: shape.dim?.h ?? '',
        }
      : null;

    const text = cfg?.content?.text;
    const styleText = text
      ? {
          fontWeight: text?.bold ? 'bold' : '',
          fontStyle: text?.italic ? 'italic' : '',
          textDecoration: text?.underline ? 'underline' : '',
        }
      : null;

    return (
      <div style={{ ...styleShape, ...styleText }} className='content'>
        {cfg?.content?.text?.data}
      </div>
    );
  }
}

class ItemEditor extends React.Component {
  render() {
    const item = this.props.item;
    const pos = item?.pos;
    const change = this.props.handleChange;

    const textOptions = item?.config?.content?.text ? (
      <div>
        <input
          onChange={(e) => {
            change({ type: 'data', data: e.target.value });
          }}
        />
        <button onClick={(e) => change({ type: 'bold' })}>B</button>
        <button onClick={(e) => change({ type: 'italic' })}>I</button>
        <button onClick={(e) => change({ type: 'underline' })}>U</button>
      </div>
    ) : null;

    return (
      <div
        style={{ transform: `translate(${pos?.x}px,${pos?.y - 50}px)` }}
        className='item-editor'
      >
        {textOptions}
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
          config: {
            content: {},
            shape: {
              border: 'black',
              background: '#FFC500',
              dim: {
                w: 200,
                h: 50,
              },
            },
          },
          pos: {
            x: 200,
            y: 200,
          },
        },
        {
          ID: 1,
          config: {
            shape: {
              border: 'black',
              background: '#FFC500',
            },
            content: {
              text: {
                data: 'lorem',
              },
            },
          },
          pos: {
            x: 500,
            y: 300,
          },
        },
      ],
      focusedItem: null,
    };
  }

  handleClick(e, item) {
    this.setState({
      focusedItem: item,
    });
  }

  handleChange(e) {
    const items = [...this.state.items];
    const i = items.findIndex((item) => item.ID === this.state.focusedItem.ID);
    let text = items[i].config.content.text;

    console.log('e');
    switch (e.type) {
      case 'bold':
        text.bold = !text.bold;
        break;
      case 'italic':
        text.italic = !text.italic;
        break;
      case 'underline':
        text.underline = !text.underline;
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
    const items = [];
    this.state.items.forEach((item) => {
      items.push(
        <Item
          pos={item.pos}
          key={item.ID}
          onClick={(e) => this.handleClick(e, item)}
        >
          <Content config={item.config} />
        </Item>
      );
    });
    return (
      <div>
        <div className='board'>
          <ItemEditor
            item={this.state.focusedItem}
            handleChange={(e) => this.handleChange(e)}
          />
          {items}
        </div>
      </div>
    );
  }
}
