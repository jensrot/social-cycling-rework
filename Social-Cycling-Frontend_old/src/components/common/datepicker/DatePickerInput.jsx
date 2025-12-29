import React from 'react';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import './datepickerinput.scss';

const DatePickerInput = ({
    value,
    onChange,
    placeholder,
    id
}) => {
    return (
        <div className="date-picker">
            <div className="date-picker__container">
                <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                    placeholderText={placeholder}
                    minDate={moment().toDate()}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    id={id}
                />
            </div>
        </div>
    )
}

DatePickerInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string
}

export default DatePickerInput
