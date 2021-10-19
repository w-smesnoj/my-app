import React from 'react';
import './ItemEditor.css';
import Draggable from 'react-draggable';
import Ic from './ic.js';
import Io from './io.js';
import ColorPalette from './ColorPalette';

export default class ItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: {
        type: null,
        pos: null,
      },
      visible: true,
    };
    this.visible = true;
  }
  drag() {
    this.setState({ visible: false });
  }
  dragStop(e) {
    this.props.handleDrag(e);
    this.setState({ visible: true });
    this.setContext(this.state.context.type, this.state.context.pos);
  }
  componentDidUpdate(prevPropse) {
    if (prevPropse.item !== this.props.item) {
      this.setContext(this.state.context.type, this.state.context.pos);
    }
  }
  setContext(type, ref) {
    let context = this.state.context;
    if (type === context.type) {
      context.type = null;
      context.pos = null;
    } else {
      context.type = type;
      const rect = ref?.current.getBoundingClientRect();
      context.pos = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    }
    this.setState(context);
  }
  toggleTextStyle(type) {
    let item = Object.assign({}, this.props.item.item);
    let style = item.text.style;
    switch (type) {
      case 'bold':
        style.bold = !style.bold;
        break;
      case 'italic':
        style.italic = !style.italic;
        break;
      case 'underline':
        style.underline = !style.underline;
        break;
      case 'strikethrough':
        style.strikethrough = !style.strikethrough;
        break;
      default:
        break;
    }
    this.props.applyItemChanges(item);
  }
  formatAlign(alignment) {
    let item = Object.assign({}, this.props.item.item);
    item.text.style.align = alignment;
    this.props.applyItemChanges(item);
  }
  formatAlignVertical(alignment) {
    let item = Object.assign({}, this.props.item.item);
    item.text.style.alignVertical = alignment;
    this.props.applyItemChanges(item);
  }
  changeBorderColor(color) {
    let item = Object.assign({}, this.props.item.item);
    item.style.borderColor = color;
    this.props.applyItemChanges(item);
  }
  changeBackgroundColor(color) {
    let item = Object.assign({}, this.props.item.item);
    item.style.backgroundColor = color;
    this.props.applyItemChanges(item);
  }
  render() {
    if (!this.props.item.item) return <div></div>;

    const item = this.props.item.item;
    const x = item?.pos.x + item?.dim.w / 2;
    const y = item?.pos.y;
    const transform = `translate(${x}px,${y}px) translate(-50%, -50%) translateY(-2.7rem)`;

    const change = this.props.handleChange;
    let context = null;
    const stateContext = this.state.context;
    const style = {
      transform: `translate(${stateContext?.pos?.x}px,${stateContext?.pos?.y}px) translate(-50%, -100%) translate(0, -2em)`,
    };
    console.log(item);
    switch (stateContext.type) {
      case 'border_color':
        context = (
          <div className='control-groups toggle' style={style}>
            <div className='group'>
              <ColorPalette
                selectedColor={item.style.borderColor}
                onColorChange={(color) => this.changeBorderColor(color)}
              />
            </div>
          </div>
        );
        break;
      case 'background_color':
        context = (
          <div className='control-groups toggle' style={style}>
            <div className='group'>
              <ColorPalette
                selectedColor={item.style.backgroundColor}
                onColorChange={(color) => this.changeBackgroundColor(color)}
              />
            </div>
          </div>
        );
        break;
      case 'text_format':
        context = (
          <div className='control-groups toggle' style={style}>
            <div className='group'>
              <button onClick={() => this.toggleTextStyle('bold')}>
                <Ic>format_bold</Ic>
              </button>
              <button onClick={() => this.toggleTextStyle('italic')}>
                <Ic>format_italic</Ic>
              </button>
              <button onClick={() => this.toggleTextStyle('underline')}>
                <Ic>format_underline</Ic>
              </button>
              <button onClick={() => this.toggleTextStyle('strikethrough')}>
                <Ic>strikethrough_s</Ic>
              </button>
            </div>
          </div>
        );
        break;
      case 'format_align_center':
        context = (
          <div className='control-groups toggle' style={style}>
            <div className='group '>
              <button onClick={() => this.formatAlign('left')}>
                <Ic>format_align_left</Ic>
              </button>
              <button onClick={() => this.formatAlign('center')}>
                <Ic>format_align_center</Ic>
              </button>
              <button onClick={() => this.formatAlign('right')}>
                <Ic>format_align_right</Ic>
              </button>
            </div>
            <div className='group '>
              <button onClick={() => this.formatAlignVertical('top')}>
                <Ic>align_vertical_top</Ic>
              </button>
              <button onClick={() => this.formatAlignVertical('center')}>
                <Ic>align_vertical_center</Ic>
              </button>
              <button onClick={() => this.formatAlignVertical('bottom')}>
                <Ic>align_vertical_bottom</Ic>
              </button>
            </div>
          </div>
        );
        break;
      default:
        context = null;
        break;
    }

    let controls = null;

    switch (item.type) {
      case 'smart-connection':
        controls = <div></div>;
        break;
      case 'shape':
      default:
        const text_formatRef = React.createRef();
        const format_align_centerRef = React.createRef();
        const border_colorRef = React.createRef();
        const background_colorRef = React.createRef();
        controls = (
          <div className='control-groups'>
            {/* <div className='group'>
              <div className='font-family'>
                <button>
                  <span>Open Sans</span>
                </button>
              </div>
            </div> */}
            {/* <div className='group'>
              <div className='font-size'>
                <input type='text' name='name' value='12' />
                <button className='inc'>
                  <Io>keyboard_arrow_up</Io>
                </button>
                <button className='dec'>
                  <Io>keyboard_arrow_down</Io>
                </button>
              </div>
            </div> */}
            <div className='group'>
              <button
                onClick={(e) => this.setContext('text_format', text_formatRef)}
                ref={text_formatRef}
              >
                <Io>text_format</Io>
              </button>
              <button
                onClick={(e) =>
                  this.setContext('format_align_center', format_align_centerRef)
                }
                ref={format_align_centerRef}
              >
                <Io>format_align_center</Io>
              </button>
              {/* <button>
                <Io>link</Io>
              </button> */}
            </div>

            {/* <div className='group'>
              <button onClick={(e) => change({ type: 'bold' })}>
                <Io>format_color_text</Io>
              </button>
            </div> */}
            <div className='group'>
              <button
                onClick={(e) =>
                  this.setContext('border_color', border_colorRef)
                }
                ref={border_colorRef}
              >
                <Io
                  style={{
                    color: item.style.borderColor,
                  }}
                >
                  trip_origin
                </Io>
              </button>
              <button
                onClick={(e) =>
                  this.setContext('background_color', background_colorRef)
                }
                ref={background_colorRef}
              >
                <Ic
                  style={{
                    color: item.style.backgroundColor,
                  }}
                >
                  circle
                </Ic>
              </button>
            </div>
            {/* <div className='group'>
              <button onClick={(e) => change({ type: 'bold' })}>
                <Io>lock_open</Io>
              </button>
            </div> */}
            {/* <div className='group'>
              <div className='more'>
                <button onClick={(e) => change({ type: 'bold' })}>
                  <Io>more_horiz</Io>
                </button>
              </div>
            </div> */}
          </div>
        );
        break;
    }
    return (
      <div>
        {this.state.visible ? (
          <div>
            <div className='editor' style={{ transform: transform }}>
              {controls}
            </div>
            <div className='context'>{context}</div>
          </div>
        ) : null}
        <Draggable
          position={item.pos}
          grid={[25, 25]}
          scale={1}
          onStart={() => this.drag()}
          onStop={(e) => this.dragStop(e)}
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
