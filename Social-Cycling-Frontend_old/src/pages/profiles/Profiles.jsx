import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';

import ProfilesList from '../../components/profiles/ProfilesList';

import Spinner from '../../components/common/spinner/Spinner';
import ScrollTopButton from '../../components/common/scrolltop-button/ScrollTopButton';

import './profiles.scss';

const Profiles = (props) => {

    const [showScrollButton, setShowScrollButton] = useState(false);

    const profiles = useSelector(state => state.profile.profiles);
    const profilesLoading = useSelector(state => state.profile.loading);

    const dispatch = useDispatch();

    const clearScrollButtonAtTop = () => {
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
            if (window.pageYOffset === 0) { // If we reach the top, hide the button
                setShowScrollButton(false);
            }
        })
    }

    const goBack = () => {
        return props.history.goBack();
    }

    useEffect(() => {
        dispatch(getProfiles());
        clearScrollButtonAtTop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="profiles">
            <div className="profiles__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            {profilesLoading ? (
                <div className="profiles__loading-container">
                    <Spinner />
                </div>
            ) : (
                <ProfilesList profiles={profiles} />
            )}
            {showScrollButton ? (
                <ScrollTopButton />
            ) : null}
        </div>
    )
}

export default Profiles;
