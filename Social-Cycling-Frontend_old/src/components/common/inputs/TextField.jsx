import React from "react";
import PropTypes from "prop-types";

import './textfield.scss';

const TextField = ({
    label,
    name,
    placeholder,
    value,
    error,
    type,
    onChange,
    disabled,
    info,
    id,
    custom,
}) => {
    return (
        <React.Fragment>
            {label ? (
                <label>{label}</label>
            ) : null}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                id={id}
                data-test={custom}
            />
            {info ? (<small>{info}</small>) : null}
            {error ? (<div className="invalid-feedback">{error}</div>) : null}
        </React.Fragment>
    );
};

TextField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
    info: PropTypes.string,
    id: PropTypes.string
};

TextField.defaultProps = {
    type: "text"
};

export default TextField;
