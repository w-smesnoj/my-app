import React from 'react';

export default class ItemEditor extends React.Component {
  render() {
    return (
      <select value={this.props.value} onChange={this.props.onChange}>
        {this.props.values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    );
  }
}
