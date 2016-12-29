import React, {Component, PropTypes} from 'react';
import OutsideClick from '../common/OutsideClick/OutsideClick';
import {months} from '../../utils/dates';
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
    this.handleOnClickPrev = this.handleOnClickPrev.bind(this);
    this.handleOnClickNext = this.handleOnClickNext.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleOnBlurButton = this.handleOnBlurButton.bind(this);
    this.handleOnClickDay = this.handleOnClickDay.bind(this);
    this.state = {
      isOpen: false
    };
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
    const {isOpen} = this.state;
    this.setState({isOpen: !isOpen});
  }

  handleOnBlurButton(e) {
    const relatedTarget = e.relatedTarget;
    const isBlurringOut = relatedTarget && (!relatedTarget.classList.contains('date-input__calendar-day') &&
                                            !relatedTarget.classList.contains('date-input__month-nav'));
    isBlurringOut && this.handleOutsideClick();
  }

  handleOnClickNext(e) {
    e.stopPropagation();
    const {date} = this.state;
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    let newMonthIndex = monthIndex + 1;
    const newDate = new Date(date.toISOString());
    newDate.setMonth(newMonthIndex);
    let newYear = year;
    if (monthIndex > 11) {
      newYear = year + 1;
      newMonthIndex = 0;
      newDate.setMonth(newMonthIndex);
      newDate.setFullYear(newYear);
    }
    this.setState({date: newDate});
  }

  handleOnClickPrev(e) {
    e.stopPropagation();
    const {date} = this.state;
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    let newMonthIndex = monthIndex - 1;
    const newDate = new Date(date.toISOString());
    newDate.setMonth(newMonthIndex);
    let newYear = year;
    if (!monthIndex) {
      newYear = year - 1;
      newMonthIndex = 11;
      newDate.setMonth(newMonthIndex);
      newDate.setFullYear(newYear);
    }
    this.setState({date: newDate});
  }

  handleOnClickDay(e) {
    e.stopPropagation();
    const {date} = this.state;
    const day = e.target.textContent;
    date.setDate(day);
    this.setState({date});
  }
  handleOutsideClick() {
    const {isOpen} = this.state;
    isOpen && this.setState({isOpen: false});
  }

  formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = setTwoDigits(date.getDate());
    const month = setTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getMonthHeader() {
    const {date} = this.state;
    const month = months[date.getMonth()].name;
    const year = date.getFullYear();
    return (
      <span>{`${month} ${year}`}</span>
    );
  }

  layRemainingDays(days, startingLabel) {
    const fullWeek = [0, 1, 2, 3, 4, 5, 6];
    const rowCount = (days.length / 7 > 4) ? 4 : 3;
    const midWeekRows = (new Array(rowCount)).fill(1);
    const midRows = midWeekRows.map((mw, ri) => (
      <div className="date-input__calendar-days" key={ri}>
        {fullWeek.map((d, i) => <button className="date-input__calendar-day boxed" key={`${ri}${i}`}>
          {startingLabel + 7 * ri + i}
        </button>)}
      </div>
    ));
    days.splice(0, rowCount * 7);
    let lastRow = null;
    if (days.length) {
      const hiddenDayCount = 7 - days.length;
      const hiddenDays = (new Array(hiddenDayCount)).fill(1);
      const dayLabel = startingLabel + 7 * rowCount;
      lastRow = (
        <div className="date-input__calendar-days" key="lr">
          {days.map((d, i) => <button className="date-input__calendar-day boxed" key={`l${i}`}>
            {dayLabel + i}
          </button>)}
          {hiddenDays.map((d, i) => <div className="date-input__calendar-day hidden" key={`v5${i}`} />) }
        </div>
      );
    }
    return [midRows, lastRow];
  }

  layMonthDays() {
    const {date} = this.state;
    const month = months[date.getMonth()].name;
    const year = date.getFullYear();
    const monthDate = new Date(date.toISOString());
    monthDate.setDate(1);
    const hiddenDays = (new Array(monthDate.getDay())).fill(1);
    const visibleDays = (new Array(7 - monthDate.getDay())).fill(1);
    let dayCount = months.filter(m => m.name === month)[0].dayCount;
    const isLeapYear = !(year % 4);
    dayCount = (month === 'February' && isLeapYear) ? dayCount + 1 : dayCount;
    const remainingDayCount = dayCount - visibleDays.length;
    const remainingDays = (new Array(remainingDayCount)).fill(1);
    return (
      <div onClick={this.handleOnClickDay}>
        <div className="date-input__calendar-days">
          {hiddenDays.map((d, i) => <div className="date-input__calendar-day hidden" key={i} />)}
          {visibleDays.map((d, i) => <button className="date-input__calendar-day boxed" key={`v1${i}`} >
            {i + 1}
          </button>)}
        </div>
        {this.layRemainingDays(remainingDays, visibleDays.length + 1)}
      </div>
    );
  }

  componentWillMount() {
    const date = new Date();
    this.setState({date});
  }

  renderCalendar() {
    return (
      <div className="date-input__calendar">
        <div className="date-input__calendar-header">
          <button className="date-input__month-nav" onClick={this.handleOnClickPrev}>
            <i className="fa fa-chevron-left" />
          </button>
          <div className="date-input__header-month">
            {this.getMonthHeader()}
          </div>
          <button className="date-input__month-nav" onClick={this.handleOnClickNext}>
            <i className="fa fa-chevron-right" />
          </button>
        </div>
        <div className="date-input__calendar-body">
          <div className="date-input__calendar-days">
            <div className="date-input__calendar-day">Sun</div>
            <div className="date-input__calendar-day">Mon</div>
            <div className="date-input__calendar-day">Tue</div>
            <div className="date-input__calendar-day">Wed</div>
            <div className="date-input__calendar-day">Thu</div>
            <div className="date-input__calendar-day">Fri</div>
            <div className="date-input__calendar-day">Sat</div>
          </div>
          {this.layMonthDays()}
        </div>
      </div>
    );
  }

  render() {
    const {isOpen} = this.state;
    const {name, id, disabled, value} = this.props;
    const formattedValue = value && this.formatDate(value);
    return (
      <OutsideClick className="date-input__outside-click" onClick={this.handleOutsideClick}>
        <div className={`date-input${isOpen ? ' date-input--open' : ''}`}>
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
            <button
              className="date-input__calendar-button"
              onClick={this.handleOnClickButton}
              onBlur={this.handleOnBlurButton}
              disabled={disabled}>
              <i className="fa fa-calendar"></i>
            </button>
          </div>
          {this.renderCalendar()}
        </div>
      </OutsideClick>
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
