import React from 'react';
import './ItemEditor.css';
import Draggable from 'react-draggable';

export default class ItemEditor extends React.Component {
  render() {
    if (this.props.item.ref === undefined) return <div></div>;

    const item = this.props.item.item;
    const x = item.pos.x + item.dim.w / 2;
    const y = item.pos.y;
    const transform = `translate(${x}px,${y}px) translate(-50%, -50%) translateY(-2.7rem)`;

    const change = this.props.handleChange;

    return (
      <div>
        <div className='editor' style={{ transform: transform }}>
          <button onClick={(e) => change({ type: 'bold' })}>B</button>
        </div>
        <Draggable
          position={item.pos}
          grid={[25, 25]}
          scale={1}
          onStop={this.props.handleDrag}
        >
          <div
            className='highlight-container'
            style={{
              width: `${item.dim.w}px`,
              height: `${item.dim.h}px`,
            }}
          ></div>
        </Draggable>
      </div>
    );
  }
}
