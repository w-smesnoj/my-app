import React from 'react';
import './ItemEditor.css';
import EditorBar from './EditorBar';

import ShapeEditor from './ShapeEditor';

export default class ItemEditor extends React.Component {
  render() {
    const item = this.props.item;

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
    return <div>{editor}</div>;
  }
}
