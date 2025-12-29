import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getPost, getProfileForPost, getLikesForPost, deletePost, likePost, unlikePost } from '../../../redux/actions/postActions';
import { getProfileById } from '../../../redux/actions/profileActions';
import { getProfileByUserId } from '../../../redux/actions/profileActions';

import { copyToClipboard, generateToast } from '../../../utils';

import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';

import CommentForm from '../../../components/comments/CommentForm';

import CommentsList from '../../../components/comments/CommentsList';
import ScrollTopButton from '../../../components/common/scrolltop-button/ScrollTopButton';
import DirectionsMap from '../../../components/google-maps/directions-map/DirectionsMap';
import ReactTooltip from "react-tooltip";

import classnames from 'classnames';

import moment from 'moment';

import './postdetail.scss';

const PostDetail = (props) => {

    const dispatch = useDispatch();

    const [openPostModal, setOpenPostModal] = useState(false);
    const [openAttendeesModal, setOpenAttendeesModal] = useState(false);
    const [openNoAttendeesModal, setOpenNoAttendeesModal] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [isLinkCopied, setLinkCopied] = useState(false);

    const post = useSelector(state => state.post.post);
    const profilePost = useSelector(state => state.post.profilePost);
    const userId = useSelector(state => state.auth.user.id);
    const comments = useSelector(state => state.post.post.comments);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const postLoading = useSelector(state => state.post.loading);
    const profileByUserId = useSelector(state => state.profile.profileByUserId); // TODO: work this out

    const postId = props.match.params.id;
    const waitTime = 2500;

    console.log(post);
    // console.log(post.likes ? post.likes[0] : null);

    const onLikePost = (id) => {
        const message = "Liked!";
        generateToast("success", message, waitTime);
        dispatch(likePost(id));
    }

    const onUnLikePost = (id) => {
        const message = "Removed Like!";
        generateToast("error", message, waitTime);
        dispatch(unlikePost(id));
    }

    const authorizedToLike = () => {
        if (!isAuthenticated) {
            props.history.push('/login');
            return false
        }
        return true
    }

    const handleLikePost = () => {
        if (authorizedToLike()) {
            onLikePost(post._id);
        }

    }

    const handleDislikePost = () => {
        if (authorizedToLike()) {
            onUnLikePost(post._id);
        }
    }

    /** Check if the current logged in user has already liked the post.
     *  @param {Array<Object>} likes
     */
    const findUserLikes = (likes) => {
        if (likes) {
            // There are duplicate user likes
            if (likes.filter(like => like.user === userId).length > 0) {
                // TODO: Remove duplicate likes or disable button faster because you can double click
                // TODO: figure out how we gonna do it: https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
                removeDuplicatedLikes(likes);
                return true
            } else {
                return false
            }
        }
    }

    const removeDuplicatedLikes = () => {

    }

    const removePost = () => {
        dispatch(deletePost(postId, props.history));
    }

    const openModal = () => {
        setOpenPostModal(true)
    }

    const closeModal = () => {
        setOpenPostModal(false);
    }

    const openAttendeeModal = () => {
        // if attendees is 0 show no attendees modal
        if (post.likes.length === 0) {
            setOpenNoAttendeesModal(true)
        } else {
            setOpenAttendeesModal(true);
        }
    }

    const closeAttendeeModal = () => {
        setOpenAttendeesModal(false);
    }

    const closeNoAttendeeModal = () => {
        setOpenNoAttendeesModal(false);
    }

    const clearScrollButtonAtTop = () => {
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
            if (window.pageYOffset === 0) { // If we reach the top, hide the button
                setShowScrollButton(false);
            }
        })
    }

    const handleLinkCopy = () => {
        copyToClipboard(window.location.href);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), waitTime);

        const message = "Copied to Clipboard!";
        generateToast("success", message, waitTime);
    };

    /** Format the time in single or two digits numbers.
     *  @param {number} time
     *  @returns {string} time
     */
    const formatTime = (time) => {
        if (time < 10) {
            return time = `0${time}`
        }
        return time = `${time}`;
    }

    const getAttendees = (attendee) => {
        post.likes.map(l => {
            console.log(l);
            // dispatch(getProfileById(l.user));
        })
    }

    useEffect(() => {
        dispatch(getPost(postId));
        dispatch(getProfileForPost(postId));
        // dispatch(getLikesForPost(post.likes ? post.likes[0] : null));
        clearScrollButtonAtTop();
        // getAttendees();
        // getProfileByUserId(post.likes ? post.likes[0] : null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(post.likes);
    console.log(post.startDate);
    console.log(post.endDate);

    return (
        <div className="post-detail">
            <div className="post-detail__back-button-container">
                <Link className="back-button" to="/posts">
                    Group Rides
                </Link>
                <ToastContainer limit={1} />
            </div>
            <div className="post-detail__container">
                {/* If user id of the logged in user is the same as the user id from the post you can do these actions */}
                {post.user === userId ? (
                    <React.Fragment>
                        <div className="post-detail__personal-controls">
                            <button data-test="delete-button" data-tip="Only you can see this button!" className="personal-button" onClick={openModal}>
                                <p>
                                    Delete
                                </p>
                            </button>
                            <Link data-tip="Only you can see this button!" to={`/post/edit/${post._id}`}>
                                <button className="personal-button">
                                    Edit
                                </button>
                            </Link>
                        </div>
                        <ReactTooltip />

                        <Modal
                            open={openPostModal}
                            onClose={closeModal}
                            onBackdropClick={closeModal}
                        >
                            <div className="post-detail__modal">
                                <div className="modal-wrapper">
                                    <h1>Remove this post?</h1>
                                    <p>Are you sure you want to delete this post?</p>
                                    <p>This will also delete the likes and comments!</p>
                                    <div className="buttons-container">
                                        <button data-test="delete-confirm-button" onClick={removePost} className="delete-button">
                                            Confirm
                                        </button>
                                        <button onClick={closeModal} className="cancel-button">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </React.Fragment>
                ) : ""}

                <div className="post-detail__card">
                    <div className="share-container">
                        <h1>{post.title}</h1>
                        <button disabled={isLinkCopied} onClick={handleLinkCopy} title="Copy to Clipboard" className="share-button">
                            {isLinkCopied ?
                                (
                                    <i className="fas fa-unlink"></i>
                                ) : (
                                    <i className="fas fa-link"></i>
                                )
                            }
                        </button>
                    </div>

                    <div className="content-container">
                        <p>
                            Location: {""}
                            {post.origin} - {""}
                            {post.destination} <br />
                            Distance: {post.distance}
                        </p>
                        <p>Estimated time: {post.moving_time}</p>
                        <p>Start date: {moment(post.startDate).format('DD/MM/YYYY')}</p>
                        <p>Start time: {
                            `${formatTime(new Date(post.startTime).getHours())}:${formatTime(new Date(post.startTime).getMinutes())}`
                        }
                        </p>
                    </div>

                    <div className="content-container">
                        <p> {post.description}</p>
                    </div>

                    <div className="like-container">
                        <p style={{
                            display: "flex",
                            cursor: "pointer"
                        }} onClick={openAttendeeModal} data-tip="View attendees">Attendees:
                            <span style={{ marginLeft: "5%", fontWeight: "bold" }}>
                                {post.likes ? post.likes.length : null}
                                {/* {post.likes && post.likes.length === 0 ? "None yet" : null} */}
                            </span>
                        </p>
                        <Modal
                            open={openAttendeesModal}
                            onClose={closeAttendeeModal}
                            onBackdropClick={closeAttendeeModal}
                        >
                            <div className="post-detail__attendees-modal">
                                <div className="modal-wrapper">
                                    <div className="top-container">
                                        <h1>Attendees</h1>
                                        <span onClick={closeAttendeeModal} className="close-button">
                                            <i className="fas fa-times"></i>
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="attendees-container">
                                        {/* TODO: real data, all links to profile -> for mobile */}
                                        {post.likes ? post.likes.map(postLike => (
                                            <div>
                                                {/* We pass the user_id and with that we get the profile. In backend check: getProfileByUserId */}
                                                <Link to={`/profile/${postLike.user}`}>{postLike.user}</Link> <br />
                                            </div>
                                        )) : null}
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                        <div className="attendee">
                                            <div className="profile-info">
                                                <div>
                                                    <img src="/uploads/profielfoto.png" alt="profile-pic" />
                                                </div>
                                                <div>
                                                    <p>Luke skywalker</p>
                                                    <p>lukeskywalker</p>
                                                </div>
                                            </div>
                                            <div className="profile-button">
                                                <button>Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            open={openNoAttendeesModal}
                            onClose={closeNoAttendeeModal}
                            onBackdropClick={closeNoAttendeeModal}
                        >
                            <div className="post-detail__modal">
                                <div className="modal-wrapper">
                                    <h1>No attendees yet!</h1>
                                    <p style={{ marginBottom: "1rem", marginTop: "0.5rem" }}>Like to attend the group ride.</p>
                                    <div className="buttons-container">
                                        <button onClick={closeNoAttendeeModal} className="delete-button">OK</button>
                                        <button onClick={closeNoAttendeeModal} className="cancel-button">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <ReactTooltip />
                        <div>
                            <button data-test="like-button" disabled={findUserLikes(post.likes)} onClick={handleLikePost} className={classnames({
                                "disabled": findUserLikes(post.likes)
                            })} >
                                <i className="fa fa-thumbs-up"></i>
                            </button>

                            <button data-test="dislike-button" disabled={!findUserLikes(post.likes)} onClick={handleDislikePost} className={classnames({
                                "disabled": !findUserLikes(post.likes)
                            })}>
                                <i className="fa fa-thumbs-down"></i>
                            </button>
                        </div>
                    </div>

                    {profilePost ? (
                        <React.Fragment>
                            Created by:
                            <Link
                                style={{
                                    textDecoration: "none",
                                    marginLeft: "1%",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    color: "inherit"
                                }}
                                data-tip="View full profile"
                                data-place="top"
                                to={`/profile/${profilePost.user}`}>{profilePost.username ? (<span>{profilePost.username} </span>) : null}
                            </Link>
                            <ReactTooltip />
                        </React.Fragment>
                    ) : null}
                </div>

                {post.start_lat ? (
                    <div className="post-detail__card" style={{ padding: "0" }}>
                        <DirectionsMap
                            origin={{ lat: post.start_lat, lng: post.start_lng }}
                            destination={{ lat: post.stop_lat, lng: post.stop_lng }}
                        />
                    </div>
                ) : null}

                <CommentsList postId={postId} comments={comments} />

                {isAuthenticated ? (
                    <CommentForm postId={postId} />
                ) : null}

            </div>

            {showScrollButton ? (
                <ScrollTopButton />
            ) : null}

        </div >
    )
}

export default PostDetail
