import React from 'react'
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Spinner from '../common/spinner/Spinner';

import './post.scss'

const Post = ({ post }) => {
    return (
        post ? (
            <React.Fragment>
                <Link to={`/post/${post._id}`} className="post">
                    <div className="post__top-container">
                        <h1 className="post__title">{post.title}</h1>
                        <p>{post.likes.length}<i className="fas fa-heart"></i></p>
                    </div>
                    <div className="post__bottom-container">
                        <Moment fromNow>{post.created_at}</Moment>
                    </div>
                </Link>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <Spinner />
            </React.Fragment>
        )
    )
}

Post.propTypes = {
    post: PropTypes.object
}

export default Post
