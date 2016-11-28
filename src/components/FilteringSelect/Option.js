import React, {PropTypes} from 'react';

const Option = ({item, selectedValue, clickHandler}) => {
  const className = `filtering-select__option${(item.value === selectedValue) ? ' selected' : ''}`;
  const handleOnClick = e => {
    e.stopPropagation();
    clickHandler(item.value);
  };
  return (
    <li
      onClick={handleOnClick}
      className={className}>
      {item.label}
    </li>);
};

Option.propTypes = {
  item: PropTypes.object.isRequired,
  selectedValue: PropTypes.number,
  clickHandler: PropTypes.func.isRequired
};

export default Option;
