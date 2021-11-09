import React from 'react';
import Draggable from 'react-draggable';
import './Handles.css';

export default class Handles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  // componentDidMount() {}
  onControlledDrag = (e, position) => {
    this.props.onControlledDrag(e, position, this.props.item);
  };
  onControlledDragStop = (e, position) => {
    this.props.onControlledDragStop(e, position, this.props.item);
  };
  onControlledResizeDrag = (e, dimensions) => {
    const item = this.props.item;

    const deltaW = dimensions.x - (item.pos.x + item.dim.w);
    const deltaH = dimensions.y - (item.pos.y + item.dim.h);
    this.props.onControlledResizeDrag(
      e,
      {
        w: item.dim.w + deltaW,
        h: item.dim.h + deltaH,
      },
      this.props.item
    );
  };
  render() {
    const item = this.props.item;

    let resizeHandlePos = {
      x: item.pos.x + item.dim.w,
      y: item.pos.y + item.dim.h,
    };

    return (
      <div className='handles'>
        {/* {handles} */}

        <Draggable
          position={resizeHandlePos}
          onDrag={this.onControlledResizeDrag}
          grid={[25, 25]}
          bounds={{ left: item.pos.x, top: item.pos.y }}
        >
          <div className='drag-handle'></div>
        </Draggable>
      </div>
    );
  }
}
