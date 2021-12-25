import React from 'react';
import ItemEditor from './Components/ItemEditor.js';
import './Board.css';
import { items, template } from '../configs/items.js';
import Shape from './Components/Shape.js';
import SmartConnection from './Components/SmartConnection.js';
import { v4 as uuidv4 } from 'uuid';
import Screen from './Components/Screen.js';
import { round } from './Functions/math.js';
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      focusedItem: null,
      editingText: false,
      textData: null,
      selectedTool: null,
    };
    this.createNewShape = this.createNewShape.bind(this);
    this.selectTool = this.selectTool.bind(this);
    this.setPos = this.setPos.bind(this);
    this.setDim = this.setDim.bind(this);
    this.editingText = this.editingText.bind(this);
    this.stopEditingText = this.stopEditingText.bind(this);
    this.textChangeFire = this.textChangeFire.bind(this);
    this.clearFocus = this.clearFocus.bind(this);
    this.applyItemChanges = this.applyItemChanges.bind(this);
  }
  createNewShape(e) {
    const items = [...this.state.items];
    const newShape = template(
      uuidv4(),
      round(e.clientX - 150 / 2, 25, 0),
      round(e.clientY - 50 / 2, 25, 0),
      items.length
    );
    items.push(newShape);
    this.setState({ items });
    this.focusItem(newShape);
  }
  clearFocus(e) {
    const { editingText, textData } = this.state;
    if (e.currentTarget !== e.target) return;
    if (editingText && textData) {
      this.changeText(textData);
    }
    this.setState({
      focusedItem: null,
      editingText: false,
      textData: null,
    });
  }
  focusItem(item) {
    this.setState({
      focusedItem: item,
    });
  }
  setDim(e, dim, id) {
    const items = [...this.state.items];
    const item = items.find((item) => item.id === id);
    item.dim = dim;
    this.setState({ items });
  }
  setPos(e, pos, id) {
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
  textChangeFire(text) {
    this.setState({ textData: text });
  }
  changeText(text) {
    const { focusedItem } = this.state;
    const items = [...this.state.items];
    let index = items.findIndex((i) => i.id === focusedItem.id);
    items[index] = focusedItem;
    items[index].text.data = text;
    this.setState({ items });
  }
  editingText(e) {
    this.setState({ editingText: true });
  }
  stopEditingText(e) {
    this.setState({ editingText: false });
    const { editingText, textData } = this.state;
    if (editingText && textData) {
      this.changeText(textData);
    }
    this.setState({
      editingText: false,
      textData: null,
    });
  }
  selectTool(tool) {
    this.setState({
      selectedTool: tool,
    });
  }
  render() {
    let shapes = [];
    let smartConnections = [];
    const { items, editingText, focusedItem } = this.state;

    items.forEach((item) => {
      switch (item.type) {
        case 'shape':
          shapes.push(
            <Shape
              id={item.id}
              config={item}
              key={item.id}
              onClick={() => this.focusItem(item)}
              editingText={editingText}
              onChangeText={this.textChangeFire}
            />
          );
          break;
        case 'smart-connection':
          smartConnections.push(
            <SmartConnection
              id={item.id}
              form={item.form}
              from={items.find((i) => i.id === item.from.id)}
              to={items.find((i) => i.id === item.to.id)}
              key={item.id}
              dim={item.dim}
              pos={item.pos}
              setDim={this.setDim}
              setPos={this.setPos}
              onClick={() => this.focusItem(item)}
              className={item.className}
            />
          );
          break;
        default:
          break;
      }
    });
    let editor;
    let style;
    if (focusedItem) {
      const item = items[focusedItem.index];
      style = {
        transform: `translate(${item.pos.x}px, ${item.pos.y}px)`,
        width: `${item.dim.w}px`,
        height: `${item.dim.h}px`,
      };
      editor = (
        <ItemEditor
          item={item}
          applyItemChanges={this.applyItemChanges}
          onShapeDrag={this.setPos}
          onShapeResize={this.setDim}
          onEditingText={this.editingText}
          onStopEditingText={this.stopEditingText}
          editingText={editingText}
        />
      );
    }
    return (
      <>
        <Screen onToolSelected={this.selectTool} />
        {editor}
        <div className='highlight-container' style={style}></div>

        <div className='board'>
          {shapes}
          <svg onClick={this.clearFocus} onDoubleClick={this.createNewShape}>
            {smartConnections}
          </svg>
        </div>
      </>
    );
  }
}
