import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCurrentUser } from "../../../redux/actions/profileActions";
import { editUser } from '../../../redux/actions/authActions';

import { Link } from 'react-router-dom';

import Errors from '../../../components/common/errors/Errors';
import isEmpty from '../../../validation/index';

import './edituser.scss';

const EditUser = (props) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    const getUserData = (user) => {
        if (user) {
            user.name = !isEmpty(user.name) ? user.name : "";
            user.email = !isEmpty(user.email) ? user.email : "";

            setName(user.name);
            setEmail(user.email);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            name,
            email,
        }
        if (errors) {
            console.log(errors)
        }
        dispatch(editUser(body, props.history));
    }

    const goBack = () => {
        return props.history.goBack();
    }

    const errors = {
        name: useSelector(state => state.errors.name),
        email: useSelector(state => state.errors.email),
    }

    useEffect(() => {
        console.log(user);
        dispatch(getCurrentUser())
        getUserData(user);
    }, [])

    return (
        <div className="edit-user">
            <div className="edit-user__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            <div className="edit-user__container">
                <div className="edit-user__card">
                    {errors.name || errors.email ? <Errors errors={errors} /> : null}
                    <h1 className="edit-user__main-title">Edit your user data</h1>
                    <form noValidate="novalidate" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                name="name"
                                type="text"
                                required
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                            <small>Your name</small>
                        </div>
                        <div className="form-field">
                            <input
                                name="email"
                                type="text"
                                required
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            <small>Your email</small>
                        </div>
                        <div className="edit-user__button-container">
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                </div>
                <Link to="/request-reset">
                    <div className="edit-user__card">
                        Reset password
                    </div>
                </Link>
                <Link to="/upload-image">
                    <div className="edit-user__card">
                        Change profile picture
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default EditUser
