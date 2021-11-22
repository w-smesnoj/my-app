import React from 'react';
import ItemEditor from './Components/ItemEditor.js';
import './Board.css';
import { items } from '../configs/items.js';
import Shape from './Components/Shape.js';
import SmartConnection from './Components/SmartConnection.js';
import { v4 as uuidv4 } from 'uuid';
import Screen from './Components/Screen.js';
export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      focusedItem: {
        item: null,
        txt: null,
      },
      editingText: false,
      textData: null,
      // ind: null,
      selectedTool: null,
    };
    this.createNewShape = this.createNewShape.bind(this);
    this.selectTool = this.selectTool.bind(this);
  }
  createNewShape(e) {
    const items = [...this.state.items];
    const newShape = {
      type: 'shape',
      id: uuidv4(),
      dim: {
        w: 150,
        h: 50,
      },
      pos: {
        x: e.clientX - 150 / 2,
        y: e.clientY - 50 / 2,
      },
      text: {
        data: '',
        style: {
          bold: false,
          fontFamily: 'Inter',
          fontSize: '16',
          italic: false,
          underline: false,
          strikethrough: false,
          align: 'center',
          alignVertical: 'center',
          color: '#27262b',
        },
      },
      style: {
        backgroundColor: '#fef72f',
        borderColor: '#27262b',
        borderSize: '2',
        borderOpacity: '10',
        opacity: '9',
      },
    };
    items.push(newShape);
    this.setState({ items });
  }
  clearFocus(e) {
    if (e.currentTarget !== e.target) return;
    if (this.state.editingText && this.state.textData) {
      this.changeText(this.state.textData);
    }
    this.setState({
      focusedItem: {
        item: null,
        txt: null,
      },
      editingText: false,
      textData: null,
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
  textChangeFire(text) {
    this.setState({ textData: text });
  }
  changeText(text) {
    const items = [...this.state.items];
    let index = items.findIndex((i) => i.id === this.state.focusedItem.item.id);
    items[index] = this.state.focusedItem.item;
    items[index].text.data = text;
    this.setState({ items });
  }
  editingText(e) {
    this.setState({ editingText: true });
  }
  selectTool(tool) {
    this.setState({
      selectedTool: tool,
    });
  }
  // msOver(e) {
  // let ind = null;
  // if (e.target.classList.contains('shape')) {
  //   const item = this.state.items.find((item) => item.id === e.target.id);
  //   ind = {
  //     dim: item.dim,
  //     pos: item.pos,
  //   };
  // }
  // this.setState({
  //   ind: ind,
  // });
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
              editingText={this.state.editingText}
              onChangeText={(text) => this.textChangeFire(text)}
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
    // let ind = [];
    // && this.state.selectedTool.name === 'line'
    // if (this.state.ind) {
    //   let fcs = this.state.ind;
    //   ind.push(
    //     <div
    //       className='ind1'
    //       style={{
    //         transform: `translate(${fcs.pos.x}px, ${fcs.pos.y}px)`,
    //         width: `${fcs.dim.w}px`,
    //         height: `${fcs.dim.h}px`,
    //         position: 'absolute',
    //         outline: '2px solid red',
    //       }}
    //     ></div>
    //   );
    // }

    return (
      <div>
        <Screen onToolSelected={this.selectTool} />

        {this.state.focusedItem.item ? (
          <ItemEditor
            item={this.state.items[this.state.focusedItem.item.index]}
            applyItemChanges={(item) => this.applyItemChanges(item)}
            onShapeDrag={(e, position, item) => this.setPos(item.id, position)}
            onShapeResize={(e, dimensions, item) =>
              this.setDim(item.id, dimensions)
            }
            onEditingText={(e) => this.editingText(e)}
            editingText={this.state.editingText}
          />
        ) : null}
        {/*  onMouseOver={(e) => this.msOver(e)} */}
        <div className='board'>
          {/* {ind} */}
          {shapes}
          <svg
            onClick={(e) => this.clearFocus(e)}
            onDoubleClick={this.createNewShape}
          >
            {smartConnections}
          </svg>
        </div>
      </div>
    );
  }
}
