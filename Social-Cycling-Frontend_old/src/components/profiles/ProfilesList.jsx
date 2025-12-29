import React from 'react';
import PropTypes from 'prop-types';

import Profile from '../profiles/Profile';

import './profileslist.scss';

const ProfilesList = ({ profiles }) => {

    let profilesLogic;

    if (profiles && profiles.length > 0) {
        profilesLogic = (
            <div className="profiles-list">
                <div className="profiles-list__container">
                    {profiles.map((profile, index) => {
                        return (
                            <Profile profile={profile} key={index} />
                        )
                    }
                    )}
                </div>
            </div>
        )
    } else if (profiles && profiles.length === 0) {
        profilesLogic = (
            <div className="profiles-list__no-profiles-created">
                <p>No profiles created yet!</p>
            </div>
        )
    }

    return (
        <React.Fragment>
            {profilesLogic}
        </React.Fragment>
    )
}

ProfilesList.propTypes = {
    profiles: PropTypes.array
}

export default ProfilesList
