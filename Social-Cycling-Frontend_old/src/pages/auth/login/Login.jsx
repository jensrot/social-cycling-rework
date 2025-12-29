import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { loginUser, setUnCreatedUser } from '../../../redux/actions/authActions';
import { setUnCompletedPasswordReset, setUnCreatedPasswordReset } from "../../../redux/actions/passResetActions";
import { generateToast } from "../../../utils";

import TextField from "../../../components/common/inputs/TextField";
import Spinner from "../../../components/common/spinner/Spinner";

import "./login.scss";

const Login = (props) => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [hidden, setHidden] = useState(true);
    const [className, setClassName] = useState('far fa-eye-slash');
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const waitTime = 3000;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const passwordResetCreated = useSelector(state => state.passReset.passwordResetCreated);
    const userCreated = useSelector(state => state.auth.userCreated);
    const passwordResetCompleted = useSelector(state => state.passReset.passwordResetCompleted);
    const errorsData = useSelector(state => state.errors);

    useEffect(() => {
        if (isAuthenticated) {
            return props.history.push('/dashboard');
        }

        checkPasswordResetCreated();

        checkUserCreated();

        checkPasswordResetCompleted();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkPasswordResetCreated = () => {
        if (!isAuthenticated && passwordResetCreated) {
            const message = "Request is created! Check your mail!";
            generateToast("success", message, waitTime);
            dispatch(setUnCreatedPasswordReset()); // Set passwordResetCreated boolean back to false
        }
    }

    const checkUserCreated = () => {
        if (userCreated) {
            const message = "User is created!";
            generateToast("success", message, waitTime);
            dispatch(setUnCreatedUser()); // Set userCreated boolean back to false
        }
    }

    const checkPasswordResetCompleted = () => {
        if (passwordResetCompleted) {
            const message = "Password is reset!";
            generateToast("success", message, waitTime);
            dispatch(setUnCompletedPasswordReset()); // Set passwordResetCompleted boolean back to false
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const body = {
            loginEmail,
            loginPassword
        };

        // console.log(errorsData)

        if (errorsData) {
            showLoader();
            setErrors(errorsData);
        }
        dispatch(loginUser(body, props.history));
    };

    const showLoader = () => {
        const loadTime = 2500;
        setTimeout(() => setIsLoading(false), loadTime);
    }

    const toggleShow = () => {
        setHidden(!hidden);
        hidden ? setClassName('far fa-eye') : setClassName('far fa-eye-slash')
    }

    return (
        <div className="login">
            <div className="login__container">
                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="login__card">
                        <h1 className="login__main-title">Login</h1>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="login-body">
                                <div className="form-field">
                                    <TextField
                                        name="email"
                                        type="text"
                                        placeholder="Email"
                                        custom="email"
                                        onChange={e => setLoginEmail(e.target.value)}
                                        value={loginEmail}
                                        error={errorsData.loginEmail}
                                    />
                                </div>
                                <div className="form-field password-container">
                                    <div>
                                        <TextField
                                            name="password"
                                            type={hidden ? "password" : "text"}
                                            placeholder="Password"
                                            custom="password"
                                            onChange={e => setLoginPassword(e.target.value)}
                                            value={loginPassword}
                                            error={errorsData.loginPassword}
                                        />
                                        <i onClick={toggleShow} className={className} />
                                    </div>
                                </div>
                                <div className="login__button-container">

                                    <div className="login__login-button-container">
                                        <input type="submit" value="Login using Email" data-test="login-local-button" />
                                    </div>

                                    <div className="login__login-button-container">
                                        <i className="fab fa-facebook-square"></i>
                                        <input disabled data-tip="Coming soon" type="submit" value="Login using Facebook" />
                                    </div>

                                    <div className="login__login-button-container">
                                        <i className="fab fa-google"></i>
                                        <input disabled data-tip="Coming soon" type="submit" value="Login using Google" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
                <div className="login__card-bottom">
                    <p>
                        No account yet? <Link to="/register">Register</Link>
                    </p>
                    <p>
                        Forgot your password? <Link to="/request-reset">Reset</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
