import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    rest: PropTypes.any
};

export default PrivateRoute
