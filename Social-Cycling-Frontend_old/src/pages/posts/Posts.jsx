import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../redux/actions/postActions';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../redux/actions/profileActions';

import PostsList from '../../components/posts/PostsList';

import ScrollTopButton from '../../components/common/scrolltop-button/ScrollTopButton';
import ReactTooltip from "react-tooltip";
import Spinner from '../../components/common/spinner/Spinner';

import './posts.scss';

const Posts = (props) => {

    const [showScrollButton, setShowScrollButton] = useState(false);
    const [filteredSearchTerm, setFilteredSearchTerm] = useState("");
    const [showCross, setShowCross] = useState(false);

    const posts = useSelector(state => state.post.posts);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const postsLoading = useSelector(state => state.post.loading);
    const profile = useSelector(state => state.profile.profile);

    console.log(profile);

    const amountOfPosts = posts.length;

    const dispatch = useDispatch();

    /** Return an array of filtered data based on the searchterm.
     *  @returns {Array<Object>} filteredData
     */
    const filteredPosts = () => {
        const filteredData = posts.filter(post => post.title.toLowerCase().includes(filteredSearchTerm.toLowerCase()));
        return filteredData;
    }

    const goBack = () => {
        return props.history.goBack();
    }

    const onChange = (e) => {
        setShowCross(true);
        setFilteredSearchTerm(e.target.value);
        if (!e.target.value) { // If input field is empty
            setShowCross(false);
        }
    }

    const clearInput = () => {
        setFilteredSearchTerm('');
        setShowCross(false);
    }

    const clearScrollButtonAtTop = () => {
        window.addEventListener('scroll', () => {
            setShowScrollButton(true);
            if (window.pageYOffset === 0) { // If we reach the top
                setShowScrollButton(false); // hide the button
            }
        })
    }

    /** Return a text based on amount of posts created.
     *  @returns {string}
     */
    const generateSearchPlaceholder = () => {
        if (amountOfPosts === 0) {
            return `Search`
        } else if (amountOfPosts === 1) {
            return `Search through ${amountOfPosts} ride...`
        }
        return `Search through ${amountOfPosts} rides...`
    }

    useEffect(() => {
        dispatch(getCurrentProfile());
        dispatch(getPosts());
        clearScrollButtonAtTop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let postsHeaderLogic;

    // Check if logged in user has profile data
    // if (isAuthenticated && Object.keys(profile).length > 0) {
    //     postsHeaderLogic = (
    //         <React.Fragment>
    //             <Link to="/create-post" id="create-button">
    //                 <button data-tip="Only you can see this button!" className="create-button"> Create Group Ride</button>
    //             </Link>
    //             <ReactTooltip />
    //         </React.Fragment>
    //     )
    // } else {
    //     postsHeaderLogic =
    //         (
    //             <React.Fragment></React.Fragment>
    //         )
    // }

    return (
        <div className="posts">
            <div className="posts__header-container">
                <button className="back-button" onClick={goBack}>Go back</button>
                <div className="search-bar-container">
                    <input className="search-bar"
                        placeholder={generateSearchPlaceholder()}
                        type="text"
                        onChange={onChange}
                        value={filteredSearchTerm}
                    />
                    <button type="submit" className="search-button">
                        <i className="fa fa-search"></i>
                    </button>
                    {showCross ? (
                        <button onClick={clearInput} className="clear-button">
                            <i className="fa fa-times-circle"></i>
                        </button>
                    ) : null}
                </div>
                {postsHeaderLogic}
                {isAuthenticated ? (
                    <React.Fragment>
                        <Link to="/create-post" id="create-button">
                            <button data-tip="Only you can see this button!" className="create-button"> Create Group Ride</button>
                        </Link>
                        <ReactTooltip />
                    </React.Fragment>
                ) : null}
            </div>

            {postsLoading ? (
                <div className="posts__loading-container">
                    <Spinner />
                </div>
            ) : (
                <PostsList posts={filteredPosts()} />
            )}

            {showScrollButton ? (
                <ScrollTopButton />
            ) : null}
        </div >
    );
}

export default Posts;
