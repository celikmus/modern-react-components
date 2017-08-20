import React, { Component, PropTypes } from 'react';

class OutsideClick extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true);
  }

  handleClick(e) {
    const outside = this.outside;
    const { onClick, id } = this.props;
    // clicked outside
    if (!outside.contains(e.target)) {
      onClick(e, id);
    }
  }

  render() {
    const ref = c => {
      this.outside = c;
    };
    const { tag, className, children } = this.props;
    return React.createElement(tag || 'div', { className, ref }, children);
  }
}

OutsideClick.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
  tag: PropTypes.string,
  className: PropTypes.string
};

export default OutsideClick;
