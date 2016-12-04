import React, {PropTypes} from 'react';

const Option = ({item, selectedValue, clickHandler}) => {
  const className = `filtering-select__option${(item.value === selectedValue) ? ' selected' : ''}`;
  const handleOnClick = e => {
    e.stopPropagation();
    clickHandler(item.value);
  };
  return (
    <li
      tabIndex="0"
      onClick={handleOnClick}
      className={className}
      value={item.value}>
      {item.label}
    </li>);
};

Option.propTypes = {
  item: PropTypes.object.isRequired,
  selectedValue: PropTypes.string,
  clickHandler: PropTypes.func.isRequired
};

export default Option;
