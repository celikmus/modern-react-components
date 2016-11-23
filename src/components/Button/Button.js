/* eslint-disable no-unused-vars */
import React, {PropTypes} from 'react';
import './Button.scss';

const Button = props => {
  const {children, className, location, params, router, route, routes, routeParams, ...otherProps} = props;
  return (
    <button className={`button ${className || 'default'}`} {...otherProps}>{children || 'Submit'}</button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  location: PropTypes.any,
  params: PropTypes.any,
  router: PropTypes.any,
  routes: PropTypes.any,
  route: PropTypes.any,
  routeParams: PropTypes.any
};

export default Button;
