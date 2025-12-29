import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProfileById, getPostsFromProfileById } from '../../../redux/actions/profileActions';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip';
import { Modal, Popover } from '@material-ui/core';

import ProfilePosts from '../profile-posts/ProfilePosts';
import LocationMap from '../../../components/google-maps/location-map/LocationMap';

import Spinner from '../../../components/common/spinner/Spinner';

import './profiledetail.scss';

const ProfileDetail = (props) => {

    const [open, setOpen] = useState(false);
    const [showPopOver, setShowPopOver] = useState(false);

    const profileId = props.match.params.id;

    const userId = useSelector(state => state.auth.user.id);
    const profile = useSelector(state => state.profile.profile);
    const profilePosts = useSelector(state => state.profile.profilePosts);
    const profileLoading = useSelector(state => state.profile.loading);

    console.log(profile);

    const dispatch = useDispatch();

    const openPopOver = () => {
        setShowPopOver(true);
    }

    const closePopOver = () => {
        setShowPopOver(false);
    }

    const goBack = () => {
        return props.history.goBack();
    }

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    useEffect(() => {
        dispatch(getProfileById(profileId));
        dispatch(getPostsFromProfileById(profileId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let profileDetailLogic;

    if (profile) {
        profileDetailLogic = (
            <div>
            <div className="profile-detail__back-button-container">
                <button className="back-button" onClick={goBack}>Go back</button>
            </div>
            <div className="profile-detail__card center-horizontal">
                <img onClick={openPopOver} data-tip="View image" src={profile.user ? `/uploads/${profile.user.profilePicture}` : `/uploads/profielfoto.png`} alt="profile-pic" />
                    <Popover 
                        open={showPopOver}
                        onClose={closePopOver}
                        classes={{root: "popover-root", paper: "paper-popover"}}
                        // backdropInvisible={false}
                        style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                          }}
                    >
                        <img className="profile-detail__popover" src={profile.user ? `/uploads/${profile.user.profilePicture}` : `/uploads/profielfoto.png`} alt="profile-pic" /> 
                    </Popover>
                <h1 style={{fontSize: "2.5rem"}}>
                    {profile.user.name}
                </h1>
                <p>{profile.level}</p>
                {/* TODO: chat message */}
                <p className="profile-detail__chat-button">
                    <Link to="/"> 
                        <i data-tip="Send message (coming soon)" className="far fa-comment"></i>
                    </Link>
                </p>
            </div>
            <div className="profile-detail__card center-horizontal">
                {profile.bio ? (
                    <div>
                        <h2>
                           {/* {profile.user.name} {profile.user.name.slice(-1) === 's' ? 'his' : null} bio: */}
                           {profile.user.name} his bio:
                        </h2>
                        {profile.bio}
                    </div>
                ) : (
                    <p> {profile.user.name} doesn't have a bio! </p>
                    )}
            </div>
            <div className="profile-detail__card">
                <div className="profile-detail__info-card">
                    <p>Username: {profile.username}</p>
                    {profile.location ? (
                        <div>
                            <p>Location: {""}
                                <span
                                    data-tip="View on map" 
                                    onClick={openModal} 
                                    style={{ 
                                        fontWeight: "bold", 
                                        cursor: "pointer", 
                                    }}
                                >{profile.location}</span> 
                            </p>
                            <ReactTooltip />
                            <Modal
                                open={open}
                                onClose={closeModal}
                                onBackdropClick={closeModal}
                            >
                                <LocationMap address={profile.location} isMarkerShown={true} />
                            </Modal>
                        </div>
                    ) : (
                        <p>{profile.user.name} didn't add a location</p>
                        )}
                    <p>Member since: <Moment format="DD/MM/YYYY">{profile.created_at}</Moment></p>
                </div>
            </div>
            <div className="profile-detail__card">
                {profile.social ? (
                    <div className="profile-detail__social-container">
                       {profile.social.youtube ? (
                            <a href={`https://youtube.com/user/${profile.social.youtube}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-youtube youtube-icon"></i>
                           </a>
                           ) : null}
                       {profile.social.twitter ? (
                       
                           <a href={`https://twitter.com/${profile.social.twitter}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter twitter-icon"></i>
                           </a>
                       ) : null}
                       {profile.social.instagram ? (
                            
                            <a href={`https://www.instagram.com/${profile.social.instagram}`} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram instagram-icon"></i>
                            </a>
                        ) : null}
                    </div>
                ) : (
                <p>{profile.user.name} didn't add social links!</p>
                )}
            </div>

            {profilePosts.length !== 0 ? (
                <div className="profile-detail__card">
                    <h2>Created group rides:</h2>
                    <ProfilePosts posts={profilePosts} />
                </div>
            ) : (
                <div className="profile-detail__card">
                    <p>{profile.user.name} didn't create any rides yet!</p>
                </div>
            )}

            {profileId === userId ? (
                <div className="profile-detail__card">
                        <div className="profile-detail__your-profile-card">
                            <h3>This is your profile!</h3>
                            <Link data-tip="Only you can see this button!" to="/edit-profile">Edit</Link>
                            <ReactTooltip />
                        </div>
                </div>
            ) : null}

        </div>
        )
    } else if (profile && !Object.keys(profile).length > 0) {
        profileDetailLogic = (
            <div className="profile-detail__no-profile">
                <h1>This profile doesn't seem to be created yet</h1>
                <div className="profile-detail__back-button-container">
                    <button className="back-button" onClick={goBack}>Go back</button>
                </div>
            </div>
        )
    } else if (profileLoading) {
        profileDetailLogic = (
            <div className="profile-detail__loading-container">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="profile-detail">
            {profileDetailLogic}
        </div>
    )
}

export default ProfileDetail