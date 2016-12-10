import React, {Component, PropTypes} from 'react';
import './DateInput.scss';

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

  handleOnFocus() {
    this.setState({value: ''});
  }

  handleOnChange(e) {
    e.stopPropagation();
    const value = e.target.value;
    this.setState({value});
  }

  componentWillReceiveProps(nextProps) {
    const {value} = this.props;
    if (nextProps.value !== value) {
      this.setState({value: nextProps.value});
    }
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
