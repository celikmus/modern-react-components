import React, {Component, PropTypes} from 'react';
import OutsideClick from '../common/OutsideClick/OutsideClick';
import Option from './Option';
import './FilteringSelect.scss';

class FilteringSelect extends Component {
  constructor(props) {
    super(props);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      isOpen: false,
      selectedOption: null,
      currentOptions: props.options
    };
  }
  get() {
    const {selectedOption} = this.state;
    return selectedOption.label;
  }
  set(currency) {
    const {options} = this.state;
    const selectedOption = options.filter(opt => opt.label === currency)[0];
    this.setState({selectedOption});
  }
  componentWillMount() {
    const selectedOption = this.props.value &&
      this.props.options.filter(opt => opt.label === this.props.value)[0];
    this.setState({selectedOption});
  }
  handleOutsideClick() {
    const {isOpen} = this.state;
    isOpen && this.setState({isOpen: false});
  }
  handleOnBlur(e) {
    const value = e.target.value;
    const {currentOptions} = this.state;
    const selectedOption = currentOptions.filter(opt => opt.label === value)[0];
    this.setState({isOpen: false, selectedOption});
  }
  handleOnChange(e) {
    e.stopPropagation();
    const {options} = this.props;
    const value = e.target.value;
    const currentOptions = options.filter(op => op.label.startsWith(value));
    this.setState({currentOptions});
  }
  handleOnClickButton(e) {
    e.stopPropagation();
    const {isOpen} = this.state;
    this.setState({isOpen: !isOpen});
  }
  handleChangeOption(value) {
    const {currentOptions} = this.state;
    const selectedOption = currentOptions.filter(opt => opt.value === value)[0];
    this.input.value = selectedOption.label;
    this.setState({selectedOption, isOpen: false});
  }
  renderMenu() {
    const {options} = this.props;
    const {isOpen, selectedOption} = this.state;
    return (
      isOpen && <ul className="filtering-select__menu">
        {options.map(item => <Option
          item={item}
          key={item.value}
          selectedValue={selectedOption && selectedOption.value}
          clickHandler={this.handleChangeOption} />)}
      </ul>
    );
  }
  render() {
    const {isOpen, selectedOption} = this.state;
    const value = selectedOption ? selectedOption.label : '';
    return (
      <OutsideClick className="filtering-select__outside-click" onClick={this.handleOutsideClick}>
        <div className="filtering-select">
          <div className="filtering-select__control">
            <input
              className="filtering-select__input"
              defaultValue={value}
              ref={c => (c && (this.input = c))}
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur} />
            <button className="filtering-select__button" onClick={this.handleOnClickButton}>
              <i className={`fa fa-caret-${isOpen ? 'up' : 'down'}`}></i>
            </button>
          </div>
          {this.renderMenu()}
        </div>
      </OutsideClick>
    );
  }
}

FilteringSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string
};

export default FilteringSelect;
