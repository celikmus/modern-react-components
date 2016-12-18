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
    this.handleOnClickButton = this.handleOnClickButton.bind(this);
    this.renderCalendar = this.renderCalendar.bind(this);
  }

  isSeparator(value, i) {
    const isSeparator = (value.length === i) && (value[i - 1] !== '/');
    return isSeparator;
  }

  handleOnChange(e) {
    e.stopPropagation();
    const {changeHandler} = this.props;
    const datePattern = /^\d{2}[/-]\d{2}[/-]\d{4}/;
    const targetValue = e.target.value;
    const value = datePattern.exec(targetValue);
    const selStart = e.target.selectionStart;
    if (value) {
      const isoDate = (new Date(value)).toISOString();
      changeHandler(isoDate);
    } else if (this.isSeparator(targetValue, 2) || this.isSeparator(targetValue, 5)) {
      e.target.value += '/';
    } else if (targetValue.length === 3 && selStart === 2) {
      e.target.setSelectionRange(3, 3);
    } else if (targetValue.length === 6 && selStart === 5) {
      e.target.setSelectionRange(6, 6);
    }
  }

  handleOnClickButton() {

  }

  formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = setTwoDigits(date.getDate());
    const month = setTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  renderCalendar() {

  }

  render() {
    const {name, id, disabled, value} = this.props;
    const formattedValue = value && this.formatDate(value);
    return (
      <div className="date-input">
        <div className="date-input__controls">
          <input
            id={id}
            name={name}
            ref={c => { if (c) { this.input = c; } }}
            className="date-input__input"
            placeholder="dd/mm/yyyy"
            defaultValue={formattedValue}
            disabled={disabled}
            onChange={this.handleOnChange} />
          <button className="date-input__calendar-button" onClick={this.handleOnClickButton} disabled={disabled}>
            <i className="fa fa-calendar"></i>
          </button>
        </div>
        <div className="date-input__calendar">
          {this.renderCalendar()}
        </div>
      </div>
    );
  }
}

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  changeHandler: PropTypes.func.isRequired
};

export default DateInput;
