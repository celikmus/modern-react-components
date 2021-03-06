import React, {Component, PropTypes} from 'react';
import Keys from '../../utils/keys';
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
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.state = {
      isOpen: false,
      currentOptions: props.options
    };
  }
  get() {
    return this.state.value;
  }
  set(value) {
    this.setState({value});
  }

  handleOutsideClick() {
    const {isOpen} = this.state;
    isOpen && this.setState({isOpen: false});
  }

  handleOnKeyDown(e) {
    const {isOpen, currentOptions} = this.state;
    switch (e.keyCode) {
      case Keys.enter:
        const target = e.target;
        if (isOpen) {
          this.handleKeyEnter(target);
        } else {
          this.setState({isOpen: true}, () => {
            this.handleKeyEnter(target);
          });
        }
        break;
      case Keys.esc:
        this.handleOutsideClick();
        break;
      case Keys.up:
        e.preventDefault();
        this.navigateUp(e.target);
        break;
      case Keys.down:
        e.preventDefault();
        this.navigateDown(e.target);
        break;
      case Keys.tab:
        this.setState({isOpen: false});
        const {tagName, value} = e.target;
        if (tagName.toLowerCase() === 'input') {
          const {name, changeHandler} = this.props;
          const selectedOption = currentOptions.filter(opt => opt.label === value)[0];
          if (selectedOption) {
            changeHandler(name, value);
          }
        }
        break;
      default:
        break;
    }
  }

  navigateDown(ref) {
    const tagName = ref.tagName.toLowerCase();
    switch (tagName) {
      case 'button':
      case 'input':
        this.menu.firstChild.focus();
        break;
      case 'li':
        ref.nextSibling && ref.nextSibling.focus();
        break;
      default:
        break;
    }
  }

  navigateUp(ref) {
    if (ref.tagName.toLowerCase() === 'input') {
      this.setState({isOpen: false});
    } else if (ref.tagName.toLowerCase() === 'li') {
      if (ref.previousSibling) {
        ref.previousSibling.focus();
      } else {
        this.input && this.input.focus();
      }
    }
  }

  handleKeyEnter(ref) {
    const tagName = ref.tagName.toLowerCase();
    const {isOpen, currentOptions} = this.state;
    switch (tagName) {
      case 'button':
        if (isOpen) {
          this.setState({isOpen: false});
        } else {
          this.handleChangeOption(ref.value);
        }
        break;
      case 'input':
        const {name, changeHandler} = this.props;
        const selectedOption = currentOptions.filter(opt => opt.label === ref.value)[0];
        if (selectedOption) {
          changeHandler(name, ref.value);
        }
        break;
      case 'li':
        this.handleChangeOption(ref.getAttribute('value'));
        break;
      default:
        break;
    }
  }

  handleOnBlur(e) {
    const isButton = e.target.tagName.toLowerCase() === 'button';
    if (isButton) {
      const relatedTarget = e.relatedTarget;
      const isBlurringOut = relatedTarget && relatedTarget.className !== 'filtering-select__option';
      isBlurringOut && this.handleOutsideClick();
    } else {
      const {currentOptions} = this.state;
      let value = e.target.value;
      const selectedOption = currentOptions.filter(opt => opt.label === value)[0];
      if (!selectedOption) {
        value = this.props.value;
      }
      this.setState({value});
    }
  }

  handleOnChange(e) {
    e.stopPropagation();
    const value = e.target.value.toUpperCase();
    const {options} = this.props;
    const currentOptions = options.filter(op => op.label.startsWith(value));
    this.setState({currentOptions, isOpen: true, value});
  }
  handleOnClickButton(e) {
    e.stopPropagation();
    const {isOpen} = this.state;
    this.setState({isOpen: !isOpen});
  }
  handleChangeOption(value) {
    const {name, changeHandler, options} = this.props;
    const {value: stateValue} = this.state;
    if (value !== stateValue) {
      changeHandler(name, value);
      this.setState({value, isOpen: false, currentOptions: options});
    }
  }
  renderMenu() {
    const {currentOptions} = this.state;
    const {isOpen, value} = this.state;
    return (
      isOpen && <ul
        ref={c => { if (c) { this.menu = c; } }}
        className="filtering-select__menu">
        {currentOptions.map(item => <Option
          item={item}
          key={item.value}
          selectedValue={value}
          clickHandler={this.handleChangeOption} />)}
      </ul>
    );
  }

  componentWillReceiveProps(nextProps) {
    const {value} = this.state;
    if (value !== nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }
  render() {
    const {isOpen, value, currentOptions} = this.state;
    const {name, placeholder} = this.props;
    const item = currentOptions.filter(opt => opt.value === value)[0];
    return (
      <OutsideClick className="filtering-select__outside-click" onClick={this.handleOutsideClick}>
        <div className="filtering-select" onKeyDown={this.handleOnKeyDown} >
          <div className="filtering-select__control" onBlur={this.handleOnBlur} >
            <input
              className="filtering-select__input"
              name={name}
              ref={c => { if (c) { this.input = c; } }}
              value={item ? item.label : (value || '')}
              placeholder={placeholder}
              autoComplete="off"
              onChange={this.handleOnChange} />
            <button
              className="filtering-select__button"
              onClick={this.handleOnClickButton}>
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
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default FilteringSelect;
