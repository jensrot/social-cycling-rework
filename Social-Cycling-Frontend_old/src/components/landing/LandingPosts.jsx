import React from 'react';
import PropTypes from 'prop-types';
import Post from '../posts/Post';
import Spinner from '../common/spinner/Spinner';
import ScrollContainer from 'react-indiana-drag-scroll'

import { generateFlexContainer } from '../../utils';

import './landingposts.scss';

const LandingPosts = ({ posts }) => {

    let landingPostsLogic;

    if (posts.length > 0) {
        landingPostsLogic = (
            <div className="landing-posts">
                <ScrollContainer
                    vertical={false}
                    hideScrollbars={false}
                    className="landing-posts__container"
                    style={{ justifyContent: generateFlexContainer(posts) }}
                >
                    {posts.map((post, index) => {
                        return (
                            <Post post={post} key={index} />
                        )
                    }
                    )}
                </ScrollContainer>
            </div >
        )
    } else if (posts.length === 0) {
        landingPostsLogic = (
            <React.Fragment>
                <p>No group rides found!</p>
            </React.Fragment >
        )
    } else {
        landingPostsLogic = (
            <div className="landing-post__loading-container">
                <Spinner />
            </div>
        )
    }

    return (
        <React.Fragment>
            {landingPostsLogic}
        </React.Fragment>
    )
}

LandingPosts.propTypes = {
    posts: PropTypes.array
}

export default LandingPosts
