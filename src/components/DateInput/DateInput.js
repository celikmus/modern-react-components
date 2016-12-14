import React, {Component, PropTypes} from 'react';
import Keys from '../../utils/keys';
import './DateInput.scss';

const setTwoDigits = number => {
  const num = number / 1;
  const result = number < 10 ? `0${num}` : num;
  return result;
};

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.state = {
      value: this.formatDate(props.value)
    };
  }

  handleOnBlur() {

  }

  handleOnFocus(e) {

  }

  handleOnChange(e) {
    e.stopPropagation();
    const caretPosition = e.target.selectionStart;
    switch (caretPosition) {
      case 2:
      case 5:
        e.preventDefault();
        const sel = window.getSelection(e.target);
        const selStart = sel.selectionStart;
        debugger;
        // const range = document.createRange();
        // sel.removeAllRanges();
        // range.setStart(e.target, 0);
        // range.setEnd(e.target, 0);
        // range.collapse();
        // sel.addRange(range);
        break;
      default:
        break;
    }
    // this.setState({value: e.target.value});
  }

  handleOnKeyDown(e) {
    const selStart = e.target.selectionStart;
    const selEnd = e.target.selectionEnd;
    console.log(`selStart: ${selStart}`);
    console.log(`selEnd: ${selEnd}`);
    switch (e.keyCode) {
      case Keys.enter:
        break;
      case Keys.esc:
        break;
      case Keys.up:
      case Keys.down:
      case Keys.tab:
        break;
      case Keys.space:
        e.preventDefault();
        break;
      case Keys.backspace:
        if ((selStart === 3) || (selStart === 6)) {
          e.preventDefault();
        }
        const {value: stateValue} = this.state;
        if (selStart < 3) {
          const valueDay = `${stateValue.substring(0, selStart - 1)}d${stateValue.substring(selStart, stateValue.length)}`;
          this.setState({value: valueDay});
        } else if (selStart < 6) {
          const valueMonth = `${stateValue.substring(0, selStart - 1)}m${stateValue.substring(selStart, stateValue.length)}`;
          this.setState({value: valueMonth});
        }
        break;
      case Keys.forwardSlash:
        e.preventDefault();
        break;
      default:
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    // const {value} = this.props;
    // if (nextProps.value !== value) {
    //   // this.setState({value: nextProps.value});
    // }
  }

  formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = setTwoDigits(date.getDate());
    const month = setTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  render() {
    const {name, id, disabled} = this.props;
    const {value} = this.state;
    return (
      <div
        className="date-input">
        <input
          id={id}
          name={name}
          ref={c => { if (c) { this.input = c; } }}
          className="date-input__input"
          placeholder="dd/mm/yyyy"
          value={value}
          disabled={disabled}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          onKeyDown={this.handleOnKeyDown}
          onChange={this.handleOnChange} />
        <button className="date-input__calendar-button" disabled={disabled}>
          <i className="fa fa-calendar"></i>
        </button>
      </div>
    );
  }
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string
};

export default DateInput;
