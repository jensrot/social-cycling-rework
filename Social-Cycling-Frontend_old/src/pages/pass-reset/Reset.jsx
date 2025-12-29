import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/passResetActions';

import TextField from "../../components/common/inputs/TextField";
import Errors from '../../components/common/errors/Errors';

import './reset.scss';

const Reset = (props) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [classNamePassword, setClassNamePassword] = useState('far fa-eye-slash');

    const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
    const [classNameConfirmPassword, setClassNameConfirmPassword] = useState('far fa-eye-slash');

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const errors = {
        password: useSelector(state => state.errors.password),
        confirmPassword: useSelector(state => state.errors.confirmPassword),
    }

    console.log(errors)

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        const token = props.match.params.token;
        console.log(token);
        const body = {
            password,
            confirmPassword
        };
        if (errors) {
            console.log(errors.email);
        }
        dispatch(resetPassword(token, body, props.history));
    }

    const toggleShowPassword = () => {
        setHiddenPassword(!hiddenPassword);
        hiddenPassword ? setClassNamePassword('far fa-eye') : setClassNamePassword('far fa-eye-slash')
    }

    const toggleShowConfirmPassword = () => {
        setHiddenConfirmPassword(!hiddenConfirmPassword);
        hiddenConfirmPassword ? setClassNameConfirmPassword('far fa-eye') : setClassNameConfirmPassword('far fa-eye-slash')
    }

    const goBack = () => {
        if (!isAuthenticated) {
            return props.history.push('/login');
        }
        return props.history.push('/');
    }

    return (
        <div>
            <div className="reset">
                <div className="reset__container">
                    <div className="reset__back-button-container">
                        <button className="back-button" onClick={goBack}>Go back</button>
                    </div>
                    {errors.password || errors.confirmPassword ? <Errors errors={errors} /> : null}
                    <div className="reset__card">
                        <h1 className="reset__main-title">Reset password</h1>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="reset-body">
                                <div className="form-field">
                                    <TextField
                                        name="password"
                                        type={hiddenPassword ? "password" : "text"}
                                        placeholder="New password"
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <i onClick={toggleShowPassword} className={classNamePassword} />
                                </div>
                                <div className="form-field">
                                    <TextField
                                        name="confirm-password"
                                        type={hiddenConfirmPassword ? "password" : "text"}
                                        placeholder="Confirm password"
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                    />
                                    <i onClick={toggleShowConfirmPassword} className={classNameConfirmPassword} />
                                </div>
                            </div>
                            <div className="reset__button-container">
                                <input
                                    type="submit"
                                    value="Reset"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reset
