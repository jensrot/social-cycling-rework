import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './header.scss'

const Header = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    const [openMenu, setOpenMenu] = useState(false);

    const toggle = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <React.Fragment>
            <header className="header">
                <div className="header__container">
                    <div className="header__logo-container">
                        <Link to="/" className="header__logo">SocialCycling</Link>
                        <span className="header__beta">BETA</span>
                    </div>
                    <nav>
                        <ul className="header__menu">
                            <li>
                                <Link to="/posts">Group Rides</Link>
                            </li>
                            {/* TODO: think about chat feature */}
                            {/* {isAuthenticated ? (
                                <li>
                                    <Link to="/posts">Messages</Link>
                                </li>
                            ) : null} */}
                            {isAuthenticated ? (
                                <li>
                                    <Link to="/dashboard">
                                        <button>{user.name}</button>
                                    </Link>
                                </li>
                            ) : (
                                    <li>
                                        <Link to="/login"><button>Login</button></Link>
                                    </li>
                                )}
                        </ul>

                        <div className="header__hamburger">
                            {!openMenu ?
                                (
                                    <i onClick={toggle} className="fas fa-bars"></i>
                                )
                                : (
                                    <i onClick={toggle} className="fas fa-times"></i>
                                )
                            }
                        </div>
                    </nav>
                </div>
            </header>

            <div className="mobile-header">
                {openMenu ? (

                    <div className="mobile-header__mobile-container">
                        <li>
                            <Link to="/posts">Group Rides</Link>
                        </li>
                        {isAuthenticated ? (
                            <li>
                                <Link to="/dashboard" style={{ paddingBottom: '3%' }}>
                                    <button>{user.name}</button>
                                </Link>
                            </li>
                        ) : (
                                <li>
                                    <Link to="/login" style={{ paddingBottom: '3%' }}><button>Login</button></Link>
                                </li>
                            )}
                    </div>
                ) : null}
            </div>

        </React.Fragment >
    )
}

export default Header
