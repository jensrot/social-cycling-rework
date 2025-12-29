import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Landing from '../../components/landing/Landing'

const Home = (props) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            return props.history.push('/dashboard');
        }
    }, [])

    return (
        <React.Fragment>
            <Landing />
        </React.Fragment>
    )
}

export default Home
