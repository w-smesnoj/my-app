import React from 'react';
import './Board.css';
import { items } from '../configs/items.js';
import ItemEditor from './Components/ItemEditor.js';
import Shape from './Components/Shape.js';
import SmartConnection from './Components/SmartConnection.js';

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
  focusItem(e, item, ref) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({
      focusedItem: {
        item: item,
        ref: ref.current,
      },
    });
    // console.log(this.state.focusedItem, 'i');
  }

  handleChange(e) {
    const items = [...this.state.items];
    const item = items.find(
      (item) => item.id === this.state.focusedItem.item.id
    );

    switch (e.type) {
      case 'bold':
        item.text.style.bold = !item.text.style.bold;
        break;
      default:
        return;
    }
    this.setState({ items });
  }
  setDim(id, dim) {
    const items = [...this.state.items];
    const item = items.find((item) => item.id === id);
    item.dim = dim;
    this.setState({ items });
  }
  setPos(id, pos) {
    const items = [...this.state.items];
    const item = items.find((item) => item.id === id);
    item.pos = pos;
    this.setState({ items });
  }

  applyItemChanges(item) {
    const items = [...this.state.items];
    let index = items.findIndex((i) => i.id === item.id);
    items[index] = item;
    this.setState({ items });
  }
  changeText(text) {
    const items = [...this.state.items];
    let index = items.findIndex((i) => i.id === this.state.focusedItem.item.id);
    items[index] = this.state.focusedItem.item;
    items[index].text.data = text;
    this.setState({ items });
  }
  // controlledDrag(e, position, item) {
  //   const items = [...this.state.items];
  //   const itemx = items.find((iteme) => iteme.id === item.id);
  //   itemx.pos = position;
  //   this.setState({ items });
  // }

  render() {
    let shapes = [];
    let smartConnections = [];

    this.state.items.forEach((item) => {
      const ref = React.createRef();
      switch (item.type) {
        case 'shape':
          shapes.push(
            <Shape
              id={item.id}
              config={item}
              key={item.id}
              setRef={ref}
              onClick={(e) => this.focusItem(e, item, ref)}
            />
          );
          break;
        case 'smart-connection':
          const A = this.state.items.find((i) => i.id === item.from.id);
          const B = this.state.items.find((i) => i.id === item.to.id);
          smartConnections.push(
            <SmartConnection
              id={item.id}
              form={item.form}
              from={A}
              to={B}
              key={item.id}
              dim={item.dim}
              pos={item.pos}
              setDim={(id, dim) => this.setDim(id, dim)}
              setPos={(id, pos) => this.setPos(id, pos)}
              setRef={ref}
              onClick={(e) => this.focusItem(e, item, ref)}
              className={item.className}
            />
          );
          break;
        default:
          break;
      }
    });

    return (
      <div>
        {this.state.focusedItem.item ? (
          <ItemEditor
            item={this.state.focusedItem}
            applyItemChanges={(item) => this.applyItemChanges(item)}
            onShapeDrag={(e, position, item) => this.setPos(item.id, position)}
            onShapeResize={(e, dimensions, item) =>
              this.setDim(item.id, dimensions)
            }
            onChangeText={(text) => this.changeText(text)}
          />
        ) : null}
        <div className='board'>
          {shapes}
          <svg onClick={(e) => this.clearFocus(e)}>{smartConnections}</svg>
        </div>
      </div>
    );
  }
}
