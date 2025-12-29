import React from 'react'
import PropTypes from 'prop-types';

import Post from './Post';

import './postslist.scss';

const PostsList = ({ posts }) => {

    let postsLogic;

    if (posts.length > 0) {
        postsLogic = (
            <div className="posts-list">
                <div className="posts-list__container">
                    {posts.map((post, index) => {
                        return (
                            <Post post={post} key={index} />
                        )
                    }
                    )}
                </div>
            </div>
        )
    } else if (posts.length === 0) {
        postsLogic = (
            <div className="no-posts-created">
                <p>No group rides found!</p>
            </div>
        )
    }

    return (
        <React.Fragment>
            {postsLogic}
        </React.Fragment>
    )
}

PostsList.propTypes = {
    posts: PropTypes.array
}

export default PostsList
