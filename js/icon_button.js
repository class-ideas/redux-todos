import React, {Component} from 'react';

export default class IconButton extends Component {
  getIcon() {
    if (this.props.spin) {
      return 'fa fa-spin fa-spinner';
    } else {
      return `fa fa-${this.props.icon}`;
    }
  }

  render() {
    return (
      <button 
        onClick={this.props.onClick}
        className={this.props.className}>
        <i className={this.getIcon()}/>
      </button>
    );
  }
}
