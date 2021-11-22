import React from 'react';
import './ItemEditor.css';
import EditorBar from './EditorBar';

import ShapeEditor from './ShapeEditor';

export default class ItemEditor extends React.Component {
  render() {
    const item = this.props.item;
    let style = {
      transform: `translate(${item.pos.x}px, ${item.pos.y}px)`,
      width: `${item.dim.w}px`,
      height: `${item.dim.h}px`,
      position: 'absolute',
      pointerEvents: 'none',
    };
    let editor;

    switch (item.type) {
      case 'shape':
        editor = (
          <ShapeEditor
            item={item}
            applyItemChanges={(e) => this.props.applyItemChanges(e)}
            onShapeResize={(e, dim, item) =>
              this.props.onShapeResize(e, dim, item)
            }
            onShapeDrag={(e, pos, item) => this.props.onShapeDrag(e, pos, item)}
            onChangeText={(e) => this.props.onChangeText(e)}
            onEditingText={(e) => this.props.onEditingText(e)}
            editingText={this.props.editingText}
          ></ShapeEditor>
        );
        break;
      case 'smart-connection':
        editor = (
          <div>
            <EditorBar form={[item.pos, item.dim]}>
              <div className='group'>{item.type}</div>
            </EditorBar>
          </div>
        );
        break;
      default:
        // return null;
        break;
    }
    return (
      <div>
        {editor}
        <div className='highlight-container' style={{ ...style }}></div>
      </div>
    );
  }
}
