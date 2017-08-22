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
    const { children } = this.props;
    const { currentIndex } = this.state;
    return (
      <ul className="card-collection">
        {children.map((child, i) => {
          const style = `card__${i}`;
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
  children: PropTypes.node
};

export default CardCollection;
