import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from '../../redux/actions/passResetActions';
import TextField from "../../components/common/inputs/TextField";

import Errors from '../../components/common/errors/Errors';

import './request.scss';

const Request = (props) => {

    const [email, setEmail] = useState("");

    const errors = {
        email: useSelector(state => state.errors.email),
        noUserFound: useSelector(state => state.errors.noUserFound),
        alreadyRequested: useSelector(state => state.errors.alreadyRequested)
    }

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            email,
        };
        console.log(body);
        if (errors) {
            console.log(errors.email);
        }
        dispatch(sendRequest(body, props.history));
    }

    const goBack = () => {
        return props.history.goBack();
    }

    return (
        <div className="request">
            <div className="request__container">
                <div className="request__back-button-container">
                    <button className="back-button" onClick={goBack}>Go back</button>
                </div>
                {errors.email || errors.noUserFound || errors.alreadyRequested ? <Errors errors={errors} /> : null}
                <div className="request__card">
                    <h1 className="request__main-title">Send email</h1>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="request-body">
                            <div className="form-field">
                                <TextField
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="request__button-container">
                            <input
                                type="submit"
                                value="Send"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Request
