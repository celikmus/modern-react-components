import React from 'react';
import PropTypes from 'prop-types';
import './CardCollection.scss';

const CardCollection = ({ children }) =>
  <div className="card-collection">
    {children}
  </div>;

CardCollection.propTypes = {
  children: PropTypes.node
};

export default CardCollection;
