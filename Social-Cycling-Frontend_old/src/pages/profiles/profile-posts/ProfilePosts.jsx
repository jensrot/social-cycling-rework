import React from 'react';
import PropTypes from 'prop-types';
import Post from '../../../components/posts/Post';

import ScrollContainer from 'react-indiana-drag-scroll';

import { generateFlexContainer } from '../../../utils';

import './profileposts.scss';

const ProfilePosts = ({ posts }) => {
    return (
        <div className="profile-posts">
            <ScrollContainer
                vertical={false}
                hideScrollbars={false}
                style={{ justifyContent: generateFlexContainer(posts) }}
                className="profile-posts__container"
            >
                {posts.map((post, index) => {
                    return (
                        <Post post={post} key={index} />
                    )
                }
                )}
            </ScrollContainer>
        </div>
    )
}

ProfilePosts.propTypes = {
    posts: PropTypes.array
}

export default ProfilePosts
