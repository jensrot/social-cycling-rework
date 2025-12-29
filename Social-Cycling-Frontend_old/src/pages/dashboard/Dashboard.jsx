import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../redux/actions/authActions';
import { setUnCompletedPasswordReset, setUnCreatedPasswordReset } from '../../redux/actions/passResetActions';
import { deleteAccount, getCurrentProfile } from '../../redux/actions/profileActions';
import { removeDarkmode, toggleDarkmode } from '../../redux/actions/darkmodeActions';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { generateToast } from "../../utils";

import ReactTooltip from 'react-tooltip';
import Modal from '@material-ui/core/Modal';

import Spinner from '../../components/common/spinner/Spinner';

import './dashboard.scss';

const Dashboard = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [openLogout, setOpenLogout] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);

    const profile = useSelector(state => state.profile.profile);
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.profile.loading);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const passwordResetCreated = useSelector(state => state.passReset.passwordResetCreated);
    const passwordResetCompleted = useSelector(state => state.passReset.passwordResetCompleted);

    const waitTime = 3000;

    useEffect(() => {
        dispatch(getCurrentProfile());

        checkPasswordResetCreated();

        checkPasswordResetCompleted();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkPasswordResetCreated = () => {
        if (passwordResetCreated && isAuthenticated) {
            const message = "Password is reset! Check your mail!";
            generateToast("success", message, waitTime);
            dispatch(setUnCreatedPasswordReset()); // Set passwordResetCreated boolean back to false
        }
    }

    const checkPasswordResetCompleted = () => {
        if (passwordResetCompleted) {
            const message = "Password is reset!";
            generateToast("success", message, waitTime);
            dispatch(setUnCompletedPasswordReset()); // Set passwordResetCompleted boolean back to false
        }
    }

    const removeDarkTheme = () => {
        const body = document.querySelector('html');
        body.classList.remove('darkTheme')
        localStorage.setItem('darkmode', 'false');
    }

    const logout = () => {
        removeDarkTheme();
        dispatch(logoutUser(props.history));
    }

    const removeAccount = () => {
        removeDarkTheme();
        dispatch(deleteAccount(props.history));
        dispatch(removeDarkmode());
    }

    const openLogoutModal = () => {
        setOpenLogout(true)
    }

    const closeLogoutModal = () => {
        setOpenLogout(false);
    }

    const openRemoveModal = () => {
        setOpenRemove(true)
    }

    const closeRemoveModal = () => {
        setOpenRemove(false);
    }

    const toggleTheme = () => {
        dispatch(toggleDarkmode());
    }

    const visitUploadImage = () => {
        return history.push('/upload-image');
    }

    const visitChat = () => {
        return history.push('/chat');
    }

    const visitResetPassword = () => {
        return history.push('/request-reset');
    }

    let dashboardLogic;

    if (profile === null || loading) {
        dashboardLogic = (
            <div className="dashboard__spinner-container">
                <Spinner />
            </div>
        )
    } else {
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
            dashboardLogic = (
                <React.Fragment>
                    <h1 className="dashboard__main-title">Welcome  <Link data-tip="View your own profile" to={`/profile/${user.id}`}>{user.name}</Link></h1>
                    <div>
                        <div className="dashboard__buttons-container">
                            <Link to="/edit-profile" data-test="edit-profile-button">Edit Profile</Link>
                            <Link to="/profiles" data-test="all-profiles-button">All Profiles</Link>
                            <Link to="/create-post" data-test="create-group-ride-button">Create Group Ride</Link>
                        </div>
                        <div className="dashboard__card main">
                            <div className="sb" style={{ marginBottom: '5%' }}>
                                <div>
                                    <Link data-tip="Edit user" className="sb__user-edit" to="/user/edit">
                                        {user.name}
                                    </Link>
                                </div>
                                <div>
                                    <i data-tip="Change the theme" style={{ cursor: "pointer", paddingRight: "2rem" }} onClick={toggleTheme} className="fas fa-moon"></i>
                                    <i data-tip="Send a message (coming soon)" style={{ cursor: "pointer" }} onClick={visitChat} className="fas fa-comment"></i>
                                </div>
                            </div>
                            <div className="sb">
                                <div className="sb__email">
                                    <Link data-tip="Edit user" className="sb__user-edit" to="/user/edit">
                                        {user.email}
                                    </Link>
                                </div>
                                <div>
                                    <i data-tip="Change your profile picture" style={{ cursor: "pointer", paddingRight: "2rem" }} onClick={visitUploadImage} className="fas fa-user">
                                    </i>
                                    <i data-tip="Reset your password" style={{ cursor: "pointer" }} onClick={visitResetPassword} className="fas fa-lock"></i>
                                </div>
                            </div>
                            <ReactTooltip />
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            // logged in but no profile
            dashboardLogic = (
                <React.Fragment>
                    <div className="dashboard__card">
                        <div>
                            <p>Finish creating your profile!</p>
                        </div>
                        <div>
                            <Link id="create-profile-button" data-test="create-profile-button" to="/create-profile">
                                <button className="button" data-tip="Make yourself recognisable!">
                                    Profile
                                </button>
                            </Link>
                        </div>
                        <ReactTooltip />
                    </div>
                </React.Fragment>
            );
        }
    }

    return (
        <div className="dashboard">
            <div className="dashboard__container">

                {dashboardLogic}

                <div className="dashboard__card">
                    <div className="dashboard__button-container">
                        <div>
                            <p>Logout account:</p>
                        </div>
                    </div>
                    <div>
                        <button className="button" onClick={openLogoutModal}>Logout</button>
                    </div>
                    <Modal
                        open={openLogout}
                        onClose={closeLogoutModal}
                        onBackdropClick={closeLogoutModal}
                    >
                        <div className="dashboard__modal">
                            <div className="modal-wrapper">
                                <h1>Logout?</h1>
                                <p style={{ marginBottom: "1rem" }}>Are you sure you want to logout?</p>
                                <div className="buttons-container">
                                    <button onClick={logout} className="delete-button">
                                        Confirm
                                </button>
                                    <button onClick={closeLogoutModal} className="cancel-button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
                <div className="dashboard__card">
                    <div className="dashboard__button-container">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p style={{ marginRight: "1rem" }}> Delete account:</p>
                        </div>
                    </div>
                    <div>
                        <button className="button delete-btn" data-tip="This action is irreversibel!" onClick={openRemoveModal}>Delete</button>
                    </div>

                    <Modal
                        open={openRemove}
                        onClose={closeRemoveModal}
                        onBackdropClick={closeRemoveModal}
                    >
                        <div className="dashboard__modal">
                            <div className="modal-wrapper">
                                <h1>Delete your account?</h1>
                                <p>Are you sure you want to delete your account?</p>
                                <p>This will delete your profile, user and created rides!</p>
                                <div className="buttons-container">
                                    <button onClick={removeAccount} className="delete-button">
                                        Confirm
                                </button>
                                    <button onClick={closeRemoveModal} className="cancel-button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default Dashboard;