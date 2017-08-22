import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CardCollection.scss';

class CardCollection extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
    this.handleOnClickCard = this.handleOnClickCard.bind(this);
  }

  handleOnClickCard() {}

  render() {
    const { children, width, height } = this.props;
    const { currentIndex } = this.state;
    return (
      <ul
        className="card-collection"
        style={{ width: `${width || 300}px`, height: `${height || 200}px` }}
      >
        {children.map((child, i) => {
          const style = `card card__${i}`;
          const cardStyle =
            currentIndex === i ? `${style} card--current` : style;
          return (
            <li key={i} className={cardStyle} onClick={this.handleOnClickCard}>
              {child}
            </li>
          );
        })}
      </ul>
    );
  }
}

CardCollection.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  height: PropTypes.number
};

export default CardCollection;
