import React from 'react';
import EditorBar from './EditorBar';
import Ic from './ic.js';
import Draggable from 'react-draggable';
import BarButton from './BarButton';
import Select from './Select';
import ColorPalette from './ColorPalette';
import Slider from './Slider';
import './Handles.css';
import BtnCheckbox from './BtnCheckbox';

export default class ItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEditorBar: true,
      // editingText: false,
    };
    this.fontSizeValues = [10, 14, 16, 18, 24, 36, 48, 64, 80, 144, 288];
    this.fontFamilyValues = ['Inter', 'Arial', 'Avenir'];
    this.styles = [
      {
        value: 'bold',
        ic: 'format_bold',
      },
      {
        value: 'italic',
        ic: 'format_italic',
      },
      {
        value: 'underline',
        ic: 'format_underline',
      },
      {
        value: 'strikethrough',
        ic: 'strikethrough_s',
      },
    ];
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    this.handleFontFamilyChange = this.handleFontFamilyChange.bind(this);

    this.handleBorderSizeChange = this.handleBorderSizeChange.bind(this);
    this.handleBorderOpacityChange = this.handleBorderOpacityChange.bind(this);
    this.handleOpacityChange = this.handleOpacityChange.bind(this);
  }
  dragShape(e, pos, item) {
    this.props.onShapeDrag(e, pos, item);
    this.setState({ visibleEditorBar: false });
  }
  makeTextEditable = (e) => {
    // this.setState({ editingText: true });
    this.props.onEditingText(e);
  };
  textStyle(type) {
    let item = Object.assign({}, this.props.item);
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
  handleFontSizeChange(e) {
    let item = Object.assign({}, this.props.item);
    item.text.style.fontSize = e.target.value;
    this.props.applyItemChanges(item);
  }
  handleFontFamilyChange(e) {
    let item = Object.assign({}, this.props.item);
    item.text.style.fontFamily = e.target.value;
    this.props.applyItemChanges(item);
  }
  formatAlign(alignment) {
    let item = Object.assign({}, this.props.item);
    item.text.style.align = alignment;
    this.props.applyItemChanges(item);
  }
  formatAlignVertical(alignment) {
    let item = Object.assign({}, this.props.item);
    item.text.style.alignVertical = alignment;
    this.props.applyItemChanges(item);
  }
  resizeShape = (e, dimensions) => {
    const item = this.props.item;
    const deltaW = dimensions.x - (item.pos.x + item.dim.w);
    const deltaH = dimensions.y - (item.pos.y + item.dim.h);
    this.props.onShapeResize(
      e,
      {
        w: item.dim.w + deltaW,
        h: item.dim.h + deltaH,
      },
      item
    );
  };
  handleBorderOpacityChange(e) {
    let item = Object.assign({}, this.props.item);
    item.style.borderOpacity = e.target.value;
    this.props.applyItemChanges(item);
  }
  handleOpacityChange(e) {
    let item = Object.assign({}, this.props.item);
    item.style.opacity = e.target.value;
    this.props.applyItemChanges(item);
  }
  handleBorderSizeChange(e) {
    let item = Object.assign({}, this.props.item);
    item.style.borderSize = e.target.value;
    this.props.applyItemChanges(item);
  }
  changeBorderColor(color) {
    let item = Object.assign({}, this.props.item);
    item.style.borderColor = color;
    this.props.applyItemChanges(item);
  }
  changeBackgroundColor(color) {
    let item = Object.assign({}, this.props.item);
    item.style.backgroundColor = color;
    this.props.applyItemChanges(item);
  }
  changeTextColor(color) {
    let item = Object.assign({}, this.props.item);
    item.text.style.color = color;
    this.props.applyItemChanges(item);
  }
  render() {
    const item = this.props.item;
    const pos = item.pos;
    const dim = item.dim;
    let style = {
      transform: `translate(${item.pos.x}px, ${item.pos.y}px)`,
      width: `${item.dim.w}px`,
      height: `${item.dim.h}px`,
      position: 'absolute',
    };

    return (
      <div>
        <EditorBar form={[pos, dim]}>
          <div className='group'>
            <div className='font-size'>
              <Select
                value={item.text.style.fontSize}
                onChange={this.handleFontSizeChange}
                values={this.fontSizeValues}
              />
            </div>
          </div>
          <div className='group'>
            <div className='font-family'>
              <Select
                value={item.text.style.fontFamily}
                onChange={this.handleFontFamilyChange}
                values={this.fontFamilyValues}
              />
            </div>
          </div>
          <div className='group'>
            <BarButton ic='format_bold'>
              <div className='group'>
                {this.styles.map((style) => {
                  return (
                    <BtnCheckbox
                      value={item.text.style[style.value]}
                      onChange={() => this.textStyle(style.value)}
                      ic={style.ic}
                    />
                  );
                })}
              </div>
            </BarButton>

            <BarButton ic='format_align_center'>
              <div>
                <div className='group'>
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
                <div className='group'>
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
            </BarButton>
            <BarButton ic='format_color_text'>
              <div>
                <div className='group'>
                  <ColorPalette
                    selectedColor={item.text.style.color}
                    onColorChange={(color) => this.changeTextColor(color)}
                  />
                </div>
              </div>
            </BarButton>
          </div>
          <div className='group'>
            <BarButton
              io='trip_origin'
              iconColor={item.style.borderColor}
              className='row'
            >
              <div className='group row '>
                <div className='wrapper'>
                  <Slider
                    label='Thickness'
                    vals={[0, 9]}
                    val={item.style.borderSize}
                    onChange={this.handleBorderSizeChange}
                  />
                  <Slider
                    label='Opacity'
                    vals={[0, 10]}
                    val={item.style.borderOpacity}
                    onChange={this.handleBorderOpacityChange}
                  />
                </div>
              </div>
              <div className='group'>
                <ColorPalette
                  selectedColor={item.style.borderColor}
                  onColorChange={(color) => this.changeBorderColor(color)}
                />
              </div>
            </BarButton>
            <BarButton
              ic='circle'
              iconColor={item.style.backgroundColor}
              className='row'
            >
              <div className='group row'>
                <div className='wrapper'>
                  <Slider
                    label='Opacity'
                    vals={[0, 10]}
                    val={item.style.opacity}
                    onChange={this.handleOpacityChange}
                  />
                </div>
              </div>
              <div className='group'>
                <ColorPalette
                  selectedColor={item.style.backgroundColor}
                  onColorChange={(color) => this.changeBackgroundColor(color)}
                />
              </div>
            </BarButton>
          </div>
        </EditorBar>

        {this.props.editingText ? null : (
          <div>
            <Draggable
              position={{
                x: pos.x + dim.w,
                y: pos.y + dim.h,
              }}
              onDrag={this.resizeShape}
              grid={[25, 25]}
              bounds={{ left: pos.x, top: pos.y }}
            >
              <div className='drag-handle'></div>
            </Draggable>
            <Draggable
              position={pos}
              onDrag={(e, pos) => this.dragShape(e, pos, item)}
              onStop={() => this.setState({ visibleEditorBar: true })}
              grid={[25, 25]}
            >
              <div
                className='shape-drag-handle'
                style={style}
                onDoubleClick={this.makeTextEditable}
              ></div>
            </Draggable>
          </div>
        )}
      </div>
    );
  }
}
