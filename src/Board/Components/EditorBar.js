import React from 'react';
import './ItemEditor.css';
import './EditorBar.css';
export default class EditorBar extends React.Component {
  render() {
    const pos = this.props.form[0];
    const dim = this.props.form[1];
    const x = pos.x + dim.w / 2;
    const y = pos.y;
    const position = `translate(${x}px,${y}px) translate(-50%, -50%) translateY(-2.7rem)`;
    return (
      <div>
        <div className='editor' style={{ transform: position }}>
          <div className='control-groups'>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
