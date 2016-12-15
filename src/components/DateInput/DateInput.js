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
  }

  handleOnBlur() {

  }

  handleOnFocus(e) {

  }

  handleOnChange(e) {
    e.stopPropagation();
    const {changeHandler} = this.props;
    const datePattern = /^\d{2}[/-]\d{2}[/-]\d{4}/;
    const value = datePattern.exec(e.target.value);
    if (value) {
      const isoDate = (new Date(value)).toISOString();
      changeHandler(isoDate);
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
    const {name, id, disabled, value} = this.props;
    const formattedValue = value && this.formatDate(value);
    return (
      <div
        className="date-input">
        <input
          id={id}
          name={name}
          ref={c => { if (c) { this.input = c; } }}
          className="date-input__input"
          placeholder="dd/mm/yyyy"
          defaultValue={formattedValue}
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
  id: PropTypes.string,
  changeHandler: PropTypes.func.isRequired
};

export default DateInput;
