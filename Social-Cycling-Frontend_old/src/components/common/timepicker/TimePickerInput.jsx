import React from 'react';
import PropTypes from 'prop-types';

import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';

import './timepickerinput.scss';

const TimePickerInput = ({
    value,
    onChange,
    placeholder,
    id
}) => {
    { console.log(onChange) }
    return (
        <div className="time-picker">
            <div className="time-picker__container">
                <TimePicker
                    defaultOpenValue={moment()}
                    value={value ? moment(value) : null}
                    onChange={onChange}
                    showSecond={false}
                    use12Hours={false}
                    placeholder={placeholder}
                    clearText="Clear Current Date"
                    clearIcon={
                        <i className="fas fa-times-circle" aria-hidden="true"></i>
                    }
                    autoComplete="off"
                    id={id}
                />
            </div>

        </div>
    )
}

TimePickerInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string
}

export default TimePickerInput
