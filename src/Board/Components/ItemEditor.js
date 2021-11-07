import React from 'react';
import './ItemEditor.css';
import EditorBar from './EditorBar';
// import Handles from './Handles';
import Handles from './Handles';

export default class ItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEditorBar: true,
    };
  }
  // hideEditorBar() {
  //   this.setState({ visibleEditorBar: false });
  // }
  // showEditorBar(e) {}
  onControlledDrag(e, position, item) {
    this.props.onControlledDrag(e, position, item);
    this.setState({ visibleEditorBar: false });
  }
  render() {
    const item = this.props.item.item;
    if (!item) return <div></div>;

    return (
      <div>
        <EditorBar
          visible={this.state.visibleEditorBar}
          item={item}
          onApplyItemChanges={(e) => this.props.applyItemChanges(e)}
        />
        <Handles
          item={item}
          onControlledDrag={(e, position) =>
            this.onControlledDrag(e, position, item)
          }
          onControlledResizeDrag={(e, dimensions) =>
            this.props.onControlledResizeDrag(e, dimensions, item)
          }
          onControlledDragStop={() => this.setState({ visibleEditorBar: true })}
        />
      </div>
    );
  }
}
