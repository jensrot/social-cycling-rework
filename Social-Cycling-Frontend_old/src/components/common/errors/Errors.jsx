import React from 'react';
import PropTypes from 'prop-types';

import './errors.scss';

const Errors = ({ errors }) => {
    return (
        Object.keys(errors).length > 0 ?
            <div className="errors" >
                <div className="errors__container">
                    {errors.username ? (<p className="errors__error"> {errors.username} </p>) : ""}
                    {errors.name ? (<p className="errors__error"> {errors.name} </p>) : ""}
                    {errors.email ? (<p className="errors__error"> {errors.email} </p>) : ""}
                    {errors.noUserFound ? (<p className="errors__error"> {errors.noUserFound} </p>) : ""}
                    {errors.alreadyRequested ? (<p className="errors__error"> {errors.alreadyRequested} </p>) : ""}
                    {errors.level ? (<p className="errors__error"> {errors.level} </p>) : ""}
                    {errors.title ? (<p className="errors__error"> {errors.title} </p>) : ""}
                    {errors.startDate ? (<p className="errors__error"> {errors.startDate} </p>) : ""}
                    {errors.startTime ? (<p className="errors__error"> {errors.startTime} </p>) : ""}
                    {errors.startLocation ? (<p className="errors__error"> {errors.startLocation} </p>) : ""}
                    {errors.endLocation ? (<p className="errors__error"> {errors.endLocation} </p>) : ""}
                    {errors.wrongFormat ? (<p className="errors__error"> {errors.wrongFormat} </p>) : ""}
                    {errors.youtube ? (<p className="errors__error"> {errors.youtube} </p>) : ""}
                    {errors.instagram ? (<p className="errors__error"> {errors.instagram} </p>) : ""}
                    {errors.twitter ? (<p className="errors__error"> {errors.twitter} </p>) : ""}
                    {errors.password ? (<p className="errors__error"> {errors.password} </p>) : ""}
                    {errors.confirmPassword ? (<p className="errors__error"> {errors.confirmPassword} </p>) : ""}
                </div>
            </div>
            : null
    )
}

Errors.propTypes = {
    errors: PropTypes.object
}

export default Errors
