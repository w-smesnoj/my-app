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
import BtnRadio from './BtnRadio.js';

export default class ItemEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openELement: null,
    };
    this.formatAligns = [
      {
        alignment: 'left',
        io: 'format_align_left',
      },
      {
        alignment: 'center',
        io: 'format_align_center',
      },
      {
        alignment: 'right',
        io: 'format_align_right',
      },
    ];
    this.formatAlignVerticals = [
      {
        alignment: 'top',
        io: 'align_vertical_top',
      },
      {
        alignment: 'center',
        io: 'align_vertical_center',
      },
      {
        alignment: 'bottom',
        io: 'align_vertical_bottom',
      },
    ];
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

    this.formatAlign = this.formatAlign.bind(this);
    this.formatAlignVertical = this.formatAlignVertical.bind(this);

    this.openTool = this.openTool.bind(this);
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
  formatAlign(e) {
    let item = Object.assign({}, this.props.item);
    item.text.style.align = e.target.value;
    this.props.applyItemChanges(item);
  }
  formatAlignVertical(e) {
    let item = Object.assign({}, this.props.item);
    item.text.style.alignVertical = e.target.value;
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
  openTool(e) {
    const val = e.target.value;
    let result = val === this.state.openElement ? null : val;
    this.setState({ openElement: result });
  }
  render() {
    const item = this.props.item;
    let openElement = this.state.openElement;
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
            <BarButton
              io='format_bold'
              name='tools'
              value='format_bold'
              onChange={this.openTool}
              comp={openElement}
            >
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

            <BarButton
              ic='format_align_center'
              name='tools'
              value='format_align_center'
              onChange={this.openTool}
              comp={openElement}
            >
              <div>
                <div className='group'>
                  {this.formatAligns.map((format) => {
                    return (
                      <BtnRadio
                        name='align'
                        io={format.io}
                        value={format.alignment}
                        checked={format.alignment === item.text.style.align}
                        onChange={this.formatAlign}
                      />
                    );
                  })}
                </div>
                <div className='group'>
                  {this.formatAlignVerticals.map((format) => {
                    return (
                      <BtnRadio
                        name='align-vertical'
                        io={format.io}
                        value={format.alignment}
                        checked={
                          format.alignment === item.text.style.alignVertical
                        }
                        onChange={this.formatAlignVertical}
                      />
                    );
                  })}
                </div>
              </div>
            </BarButton>
            <BarButton
              ic='format_color_text'
              name='tools'
              value='format_color_text'
              onChange={this.openTool}
              comp={openElement}
            >
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
              name='tools'
              value='trip_origin'
              onChange={this.openTool}
              comp={openElement}
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
              name='tools'
              value='circle'
              onChange={this.openTool}
              comp={openElement}
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
