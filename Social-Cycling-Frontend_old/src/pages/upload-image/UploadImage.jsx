import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile, getProfileById } from '../../redux/actions/profileActions';
import { editProfilePicture } from '../../redux/actions/authActions';

import { Link } from 'react-router-dom';

import './uploadimage.scss';

const UploadImage = (props) => {

    const dispatch = useDispatch();

    const [profilePictureFile, setProfilePictureFile] = useState({});
    const [profilePicture, setProfilePicture] = useState("");

    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.profile.profile);
    console.log(user);
    console.log(profile)

    const goBack = () => {
        return props.history.goBack();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("profilePicture", profilePictureFile);
        dispatch(editProfilePicture(formData, props.history));
    }

    const onChange = (e) => {
        setProfilePictureFile(e.target.files[0]);
        console.log(e.target.files[0].name)
    }

    useEffect(() => {
        // dispatch(getCurrentProfile());
        dispatch(getProfileById(user.id));
        setProfilePicture(user.profilePicture);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="upload-image">
            <div className="upload-image__container">
                <div className="upload-image__back-button-container">
                    <button onClick={goBack} className="back-button">Go back</button>
                </div>
                <div className="upload-image__card">

                    <h1>Upload your picture</h1>

                    <form onSubmit={onSubmit}>
                        {/* <Link to={`profile/${user.id}`}><img src={profile ? `/uploads/${profile.user.profilePicture}` : null} alt="profile-pic" /></Link> */}
                        <input type="file" onChange={onChange} />
                        <input type="submit" value="Upload" />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default UploadImage
