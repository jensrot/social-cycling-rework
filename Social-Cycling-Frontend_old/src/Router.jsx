import React from 'react';
import { Redirect, Route, Switch } from "react-router-dom";

import Posts from './pages/posts/Posts';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Home from './pages/home/Home';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import CreateProfile from './pages/profiles/create-profile/CreateProfile';
import CreatePost from './pages/posts/create-post/CreatePost';
import PostDetail from './pages/posts/post-detail/PostDetail';

import PrivateRoute from './components/common/private/PrivateRoute';
import Profiles from './pages/profiles/Profiles';
import EditProfile from './pages/profiles/edit-profile/EditProfile';
import ProfileDetail from './pages/profiles/profile-detail/ProfileDetail';
import EditPost from './pages/posts/edit-post/EditPost';
import Dashboard from './pages/dashboard/Dashboard';
import UploadImage from './pages/upload-image/UploadImage';

import Deny from './pages/pass-reset/Deny';
import Request from './pages/pass-reset/Request';
import Reset from './pages/pass-reset/Reset';
import EditUser from './pages/auth/edit-user/EditUser';

const AppRouter = () => {
    return (
        <React.Fragment>
            <Header />
            <div className="footer-bottom">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/request-reset" component={Request} />
                    <Route exact path="/reset-password/:token" component={Reset} />
                    <Route exact path="/deny-reset/:token" component={Deny} />
                    <Route exact path="/post/:id" component={PostDetail} />
                    <PrivateRoute exact path="/post/edit/:id" component={EditPost} />
                    <PrivateRoute exact path="/profiles" component={Profiles} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/profile/:id" component={ProfileDetail} />
                    <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                    <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                    <PrivateRoute exact path="/create-post" component={CreatePost} />
                    <PrivateRoute exact path="/upload-image" component={UploadImage} />
                    <PrivateRoute exact path="/user/edit" component={EditUser} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default AppRouter;
