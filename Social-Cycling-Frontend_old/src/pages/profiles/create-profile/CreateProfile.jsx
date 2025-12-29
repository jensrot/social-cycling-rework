import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateProfile } from '../../../redux/actions/profileActions';

import { scrollTop } from '../../../utils';

import ReactTooltip from "react-tooltip";

import LocationSearchInput from '../../../components/location-search-input/LocationSearchInput';

import Errors from '../../../components/common/errors/Errors';

import './createprofile.scss';

const CreateProfile = (props) => {

    const [username, setUsername] = useState("");
    const [level, setLevel] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");

    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    const [showSocialLinks, setShowSocialLinks] = useState(false);

    const dispatch = useDispatch();

    const errors = {
        username: useSelector(state => state.errors.username),
        level: useSelector(state => state.errors.level),
        youtube: useSelector(state => state.errors.youtube),
        instagram: useSelector(state => state.errors.instagram),
        twitter: useSelector(state => state.errors.twitter),
    }

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

    const handleUserNameChange = (e) => {
        // const regex = /[^a-zA-Z ]/g;
        // const regex = /[^a-z0-9_-]/g; // TODO do it better

        // setUsername(e.target.value.replace(regex, ''));
        setUsername(e.target.value);
    }

    const goBack = () => {
        return props.history.goBack();
    }

    const options = [
        { label: 'Hobbyist', value: 'Hobbyist' },
        { label: 'Junior', value: 'Junior' },
        { label: 'Amateur', value: 'Amateur' },
        { label: 'Pro Cyclist', value: 'Pro Cyclist' },
        { label: 'Other', value: 'Other' }
    ];

    useEffect(() => {
        // setLevel(options[0].value);
    }, [])

    return (
        <div className="create-profile">
            <div className="edit-profile__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            <div className="create-profile__container">
                {errors.username || errors.level || errors.youtube || errors.instagram || errors.twitter ? <Errors errors={errors} /> : null}
                <div className="create-profile__card">
                    <h1 className="create-profile__main-title">Create your profile</h1>
                    <form noValidate="novalidate" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                autoComplete="off"
                                name="username"
                                type="text"
                                placeholder="What is your username? (required)"
                                required
                                onChange={e => handleUserNameChange(e)}
                                value={username}
                                data-test="username"
                            />
                            <small>e.g. FastCyclist123</small>
                        </div>
                        <div className="form-field-select">
                            <select data-test="level" name="level" required value={level} onChange={e => setLevel(e.target.value)}>
                                <option value="" disabled default selected>What is your skill level? (required)</option>
                                {options.map((option, index) =>
                                    <option key={index} value={option.value}>
                                        {option.label}
                                    </option>
                                )}
                            </select>
                            <small>e.g. Pro Cyclist</small>
                        </div>

                        <div className="form-field">
                            <LocationSearchInput
                                placeholder="Where do you live? (optional)"
                                value={location}
                                custom="location"
                                onChange={handleLocationChange}
                                onSelect={handleLocationSelect}
                            />
                            <small>e.g. Gent, Belgium</small>
                        </div>

                        <div onClick={toggleShowSocialLinks} data-test="form-field-social" className="form-field-social">
                            <p>Social Usernames (optional)</p> <i data-tip="Add your social media profiles!" className="fas fa-sort-down"></i>
                            <ReactTooltip />
                        </div>

                        {showSocialLinks ? (
                            <div className="social-links">
                                <ul>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                name="youtube"
                                                placeholder="Youtube"
                                                data-test="youtube"
                                                onChange={e => setYoutube(e.target.value)}
                                                value={youtube}
                                            />
                                            <i className="fab fa-youtube youtube-icon"></i>
                                        </li>
                                    </div>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                name="twitter"
                                                placeholder="Twitter"
                                                data-test="twitter"
                                                onChange={e => setTwitter(e.target.value)}
                                                value={twitter}
                                            />
                                            <i className="fab fa-twitter twitter-icon"></i>
                                        </li>
                                    </div>
                                    <div className="social-container">
                                        <li>
                                            <input
                                                autoComplete="off"
                                                type="text"
                                                name="instagram"
                                                placeholder="Instagram"
                                                data-test="instagram"
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
                                name="bio"
                                placeholder="Tell us more about yourself (optional)"
                                id=""
                                cols="54"
                                rows="5"
                                data-test="bio"
                                onChange={e => handleBioChange(e)}
                                value={bio}
                            >
                            </textarea>
                            <small>e.g. I love long rides and fast sprints!</small>
                        </div>


                        <div className="create-profile__button-container">
                            <input
                                type="submit"
                                value="Create"
                                data-test="create-button"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile;