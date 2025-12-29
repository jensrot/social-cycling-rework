import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { denyReset } from '../../redux/actions/passResetActions';

const Deny = (props) => {

    const dispatch = useDispatch();
    const token = props.match.params.token;

    useEffect(() => {
        dispatch(denyReset(token, props.history))
    }, [])

    return (
        <div />
    )
}

export default Deny
