import React from 'react';
import './ItemEditor.css';
import EditorBar from './EditorBar';
import Handles from './Handles';
import Draggable from 'react-draggable';
import Shape from './Shape.js';

export default class ItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEditorBar: true,
      editingText: false,
    };
  }
  componentWillUnmount() {
    this.setState({ editingText: false });
  }
  onControlledDrag(e, position, item) {
    this.props.onControlledDrag(e, position, item);
    this.setState({ visibleEditorBar: false });
  }
  makeTextEditable = () => {
    this.setState({ editingText: true });
  };
  handleTextChange = (event) => {
    this.props.onChangeText(event.target.value);
  };
  render() {
    const item = this.props.item.item;

    let style = {
      transform: `translate(${item.pos.x}px, ${item.pos.y}px)`,
      width: `${item.dim.w}px`,
      height: `${item.dim.h}px`,
    };
    return (
      <div>
        <EditorBar
          visible={this.state.visibleEditorBar}
          item={item}
          onApplyItemChanges={(e) => this.props.applyItemChanges(e)}
        />
        <Handles
          item={item}
          onControlledResizeDrag={(e, dimensions) =>
            this.props.onControlledResizeDrag(e, dimensions, item)
          }
        />
        <Draggable
          position={item.pos}
          onDrag={(e, position) => this.onControlledDrag(e, position, item)}
          onStop={() => this.setState({ visibleEditorBar: true })}
          grid={[25, 25]}
        >
          <div
            className='highlight-container'
            style={{
              width: `${item.dim.w}px`,
              height: `${item.dim.h}px`,
              cursor: 'pointer',
            }}
            onDoubleClick={this.makeTextEditable}
          ></div>
        </Draggable>

        {this.state.editingText ? (
          <input
            type='text'
            value={item.text.data}
            className='edit-text'
            style={{ ...style, ...item.text.style }}
            onChange={this.handleTextChange}
          />
        ) : null}
      </div>
    );
  }
}
