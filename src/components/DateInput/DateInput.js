import React, {Component, PropTypes} from 'react';
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
    this.state = {value: props.value};
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
        // const sel = window.getSelection();
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
    this.setState({value: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    const {value} = this.props;
    if (nextProps.value !== value) {
      this.setState({value: nextProps.value});
    }
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
    const formattedValue = this.formatDate(value);
    return (
      <div
        className="date-input">
        <input
          id={id}
          name={name}
          ref={c => { if (c) { this.input = c; } }}
          className="date-input__input"
          placeholder="dd/mm/yyyy"
          value={formattedValue}
          disabled={disabled}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
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
