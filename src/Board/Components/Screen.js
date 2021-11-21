import React from 'react';
import BtnRadio from './BtnRadio.js';
import './screen.css';

export default class Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTool: {
        name: 'mouse',
        io: 'mouse',
      },
    };
    this.tools = [
      {
        name: 'mouse',
        io: 'mouse',
      },
      {
        name: 'line',
        io: 'north_east',
      },
    ];
    this.setSelectedTool = this.setSelectedTool.bind(this);
  }
  setSelectedTool(event) {
    const name = event.target.value;
    const tool = this.tools.find((tool) => tool.name === name);
    this.props.onToolSelected(tool);
    this.setState({
      selectedTool: tool,
    });
  }
  componentDidMount() {
    const tool = this.state.selectedTool;
    this.props.onToolSelected(tool);
    this.setState({
      selectedTool: tool,
    });
  }
  render() {
    let tools = (
      <div className='control-groups main tools'>
        <div className='group'>
          {this.tools.map((tool) => {
            return (
              <BtnRadio
                name='tool'
                io={tool.io}
                value={tool.name}
                checked={tool.name === this.state.selectedTool.name}
                onChange={this.setSelectedTool}
              />
            );
          })}
        </div>
      </div>
    );
    return <div className='screen'>{tools}</div>;
  }
}
