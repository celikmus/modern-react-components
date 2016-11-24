import React, {Component, PropTypes} from 'react';
import './FilteringSelect.scss';

class FilteringSelect extends Component {
  constructor(props) {
    super(props);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.state = {
      isOpen: false,
      selectedOption: null,
      currentOptions: props.options
    };
  }
  handleOnBlur(e) {
    const value = e.target.value;
    const {currentOptions} = this.state;
    const selectedOption = currentOptions.filter(opt => opt.label === value)[0];
    this.setState({isOpen: false, selectedOption});
  }
  handleOnChange(e) {
    const {options} = this.props;
    const value = e.target.value;
    const currentOptions = options.filter(op => op.label.startsWith(value));
    this.setState({currentOptions});
  }
  renderMenu() {
    const {options} = this.props;
    const {isOpen, selectedOption} = this.state;
    return (
      isOpen && <ul className="filtering-select__menu">
        {options.map((item, i) =>
          <li
            key={i}
            className={`filtering-select__option${(item.value
              === selectedOption) ? ' selected' : ''}`}>
            {item.label}
          </li>)}
      </ul>
    );
  }
  render() {
    const {isOpen} = this.state;
    return (
      <div className="filtering-select">
        <div className="filtering-select__control">
          <input
            className="filtering-select__input"
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur} />
          <button className="filtering-select__button">
            <i className={`fa fa-caret-${isOpen ? 'up' : 'down'}`}></i>
          </button>
        </div>
        {this.renderMenu()}
      </div>
    );
  }
}

FilteringSelect.propTypes = {
  options: PropTypes.array
};

export default FilteringSelect;
