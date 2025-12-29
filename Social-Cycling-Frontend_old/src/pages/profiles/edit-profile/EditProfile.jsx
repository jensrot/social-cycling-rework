import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile, createOrUpdateProfile, deleteProfile } from "../../../redux/actions/profileActions";

import ReactTooltip from "react-tooltip";
import Errors from '../../../components/common/errors/Errors';

import LocationSearchInput from '../../../components/location-search-input/LocationSearchInput';

import { Modal } from '@material-ui/core';

import { Link } from 'react-router-dom';

import { scrollTop } from '../../../utils';

import isEmpty from '../../../validation/index';

import './editprofile.scss';

const EditProfile = (props) => {

    const [username, setUsername] = useState("");
    const [level, setLevel] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");

    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    const [showSocialLinks, setShowSocialLinks] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);

    const errors = {
        username: useSelector(state => state.errors.username),
        level: useSelector(state => state.errors.level),
        youtube: useSelector(state => state.errors.youtube),
        instagram: useSelector(state => state.errors.instagram),
        twitter: useSelector(state => state.errors.twitter),
    }

    const getProfileData = (profile) => {
        if (profile) {
            profile.username = !isEmpty(profile.username) ? profile.username : "";
            profile.level = !isEmpty(profile.level) ? profile.level : "";
            profile.location = !isEmpty(profile.location) ? profile.location : "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
            profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";

            setUsername(profile.username);
            setLevel(profile.level);
            setLocation(profile.location);
            setBio(profile.bio);
            setYoutube(profile.social.youtube);
            setTwitter(profile.social.twitter);
            setInstagram(profile.social.instagram);
        }
    }

    useEffect(() => {
        dispatch(getCurrentProfile());
        getProfileData(profile);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleShowSocialLinks = () => {
        setShowSocialLinks(!showSocialLinks);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            username,
            level,
            location,
            bio,
            youtube,
            twitter,
            instagram
        }

        if (errors) {
            console.log(errors)
            scrollTop();
        }
        dispatch(createOrUpdateProfile(body, props.history));
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);
    }

    const handleLocationChange = (location) => {
        setLocation(location);
    }

    const handleLocationSelect = (location) => {
        setLocation(location);
    }

    const goBack = () => {
        props.history.goBack();
    }

    const openRemoveModal = () => {
        setOpenRemove(true)
    }

    const closeRemoveModal = () => {
        setOpenRemove(false);
    }

    const removeProfile = () => {
        dispatch(deleteProfile(props.history));
    }

    const options = [
        { label: 'Hobbyist', value: 'Hobbyist' },
        { label: 'Junior', value: 'Junior' },
        { label: 'Amateur', value: 'Amateur' },
        { label: 'Pro Cyclist', value: 'Pro Cyclist' },
        { label: 'Other', value: 'Other' }
    ];

    return (
        <div className="edit-profile">
            <div className="edit-profile__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
                {/* TODO: remove profile button and logic */}
                <button data-tip="This action is irreversibel!" onClick={openRemoveModal} className="delete-button">Delete</button>
                <Modal
                    open={openRemove}
                    onClose={closeRemoveModal}
                    onBackdropClick={closeRemoveModal}
                >
                    <div className="edit-profile__modal">
                        <div className="modal-wrapper">
                            <h1>Delete your profile?</h1>
                            <p>Are you sure you want to delete your profile?</p>
                            <div className="buttons-container">
                                <button onClick={removeProfile} className="delete-button">
                                    Confirm
                                </button>
                                <button onClick={closeRemoveModal} className="cancel-button">Cancel</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="edit-profile__container">
                {errors.username || errors.level || errors.youtube || errors.instagram || errors.twitter ? <Errors errors={errors} /> : null}
                <div className="edit-profile__card">
                    <h1 className="edit-profile__main-title">Edit your profile</h1>
                    <form noValidate="novalidate" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                name="username"
                                type="text"
                                placeholder="What is your username? (required)"
                                required
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                            <small>e.g. FastCyclist123</small>
                        </div>
                        <div className="form-field-select">
                            <select name="level" required value={level} onChange={e => setLevel(e.target.value)}>
                                <option value="" disabled default selected>What is your skill level? (required)</option>
                                {options.map(option =>
                                    <option key={option.label} value={option.value}>
                                        {option.label}
                                    </option>
                                )}
                            </select>
                            <small>e.g. Pro Cyclist</small>
                        </div>

                        <div style={{ marginTop: '1.5rem' }} className="form-field">
                            {/* <input
                                name="location"
                                type="text"
                                placeholder="Where do you live? (optional)"
                                required
                                onChange={e => setLocation(e.target.value)}
                                value={location}
                            /> */}
                            <LocationSearchInput
                                value={location}
                                onChange={handleLocationChange}
                                onSelect={handleLocationSelect}
                                placeholder="Where do you live? (optional)"
                            />
                            <small>e.g. Gent, Belgium</small>

                        </div>

                        <div onClick={toggleShowSocialLinks} className="form-field-social">
                            <p>Social Usernames</p> <i data-tip="Add your social media profiles!" className="fas fa-sort-down"></i>
                            <ReactTooltip />
                        </div>

                        {showSocialLinks ? (
                            <div className="social-links">
                                <ul>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                type="text"
                                                name="youtube"
                                                placeholder="Youtube"
                                                onChange={e => setYoutube(e.target.value)}
                                                value={youtube}
                                            />
                                            <i className="fab fa-youtube youtube-icon"></i>
                                        </li>
                                    </div>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                type="text"
                                                name="twitter"
                                                placeholder="Twitter"
                                                onChange={e => setTwitter(e.target.value)}
                                                value={twitter}
                                            />
                                            <i className="fab fa-twitter twitter-icon"></i>
                                        </li>
                                    </div>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                type="text"
                                                name="instagram"
                                                placeholder="Instagram"
                                                onChange={e => setInstagram(e.target.value)}
                                                value={instagram}
                                            />
                                            <i className="fab fa-instagram instagram-icon"></i>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        ) : null}

                        <div className="form-field">
                            <textarea
                                required={true}
                                name="bio"
                                placeholder="Tell us more about yourself (optional)"
                                id=""
                                cols="54"
                                rows="5"
                                onChange={e => handleBioChange(e)}
                                value={bio}
                            >
                            </textarea>
                            <small>e.g. I love long rides and fast sprints!</small>
                        </div>


                        <div className="create-profile__button-container">
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                </div>
                <Link to="/user/edit">
                    <div className="edit-profile__card">
                        Edit user
                    </div>
                </Link>
            </div>
        </div>
    )
}


export default EditProfile
