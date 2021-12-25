import React from 'react';
import './SmartConnection.css';
import { cordToDeg } from '../Functions/math.js';
export default class SmartBezier extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.updateDimAndPos();
  }
  updateDimAndPos() {
    const rect = this.myRef.current.getBoundingClientRect();
    const { scrollX, scrollY } = window;
    this.props.setDim(
      null,
      {
        w: rect.width,
        h: rect.height,
      },
      this.props.id
    );
    this.props.setPos(
      null,
      {
        x: rect.x + scrollX,
        y: rect.y + scrollY,
      },
      this.props.id
    );
  }
  onClick(e) {
    this.updateDimAndPos();
    this.props.onClick(e);
  }

  render() {
    const A = this.props.from;
    const B = this.props.to;
    let isHorizontal = false,
      a = {},
      b = {};

    determineOrientation(offsetPoints(A, 'center'), offsetPoints(B, 'center'), {
      west: () => {
        isHorizontal = true;
        a.at = 'east';
        b.at = 'west';
      },
      east: () => {
        a.at = 'west';
        b.at = 'east';
        isHorizontal = true;
      },
      north: () => {
        a.at = 'south';
        b.at = 'north';
      },
      south: () => {
        a.at = 'north';
        b.at = 'south';
      },
    });

    a = offsetPoints(A, a.at);
    b = offsetPoints(B, b.at);

    switch (this.props.form) {
      case 'bezier':
        let start = `${a.x} ${a.y}`;
        let end = `${b.x} ${b.y}`;
        let horizontal = `C ${(b.x + a.x) / 2} ${a.y} ${(b.x + a.x) / 2} ${
          b.y
        }`;
        let vertical = `C ${a.x} ${(b.y + a.y) / 2} ${b.x} ${(a.y + b.y) / 2}`;
        let bezier = isHorizontal ? horizontal : vertical;
        return (
          <path
            d={`M ${start} ${bezier}, ${end}`}
            ref={this.myRef}
            onClick={(e) => this.onClick(e)}
            className={this.props.className}
            id={this.props.id}
          ></path>
        );

      case 'linear':
      default:
        return (
          <line
            id={this.props.id}
            ref={this.myRef}
            onClick={(e) => this.onClick(e)}
            className={this.props.className}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
          />
        );
    }
  }
}

function offsetPoints(e, at) {
  const pos = e.pos;
  const dim = e.dim;

  if (at === 'south') {
    return { x: pos.x + dim.w / 2, y: pos.y + dim.h };
  } else if (at === 'north') {
    return { x: pos.x + dim.w / 2, y: pos.y };
  } else if (at === 'west') {
    return { x: pos.x, y: pos.y + dim.h / 2 };
  } else if (at === 'east') {
    return { x: pos.x + dim.w, y: pos.y + dim.h / 2 };
  } else {
    // center
    return { x: pos.x + dim.w / 2, y: pos.y + dim.h / 2 };
  }
}

function determineOrientation(A, B, callback) {
  let deg = cordToDeg(A, B);

  if (deg > 135 && deg < 225) {
    callback.west();
  } else if (deg > 315 || deg < 45) {
    callback.east();
  } else if (deg > 225 && deg < 315) {
    callback.north();
  } else {
    callback.south();
  }
}
