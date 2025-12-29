import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { editPost, getPost } from '../../../redux/actions/postActions';

import { scrollTop } from '../../../utils';

import isEmpty from '../../../validation';

import './editpost.scss'
import ReactTooltip from 'react-tooltip';
import Errors from '../../../components/common/errors/Errors';
import LocationSearchInput from '../../../components/location-search-input/LocationSearchInput';
import TimePickerInput from '../../../components/common/timepicker/TimePickerInput';
import DatePickerInput from '../../../components/common/datepicker/DatePickerInput';

const EditPost = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");

    const [open, setOpen] = useState(false);

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState();

    const dispatch = useDispatch();

    const postId = props.match.params.id;
    console.log(postId);

    const errors = {
        title: useSelector(state => state.errors.title),
        startDate: useSelector(state => state.errors.startDate),
        startTime: useSelector(state => state.errors.startTime),
        startLocation: useSelector(state => state.errors.startLocation),
        endLocation: useSelector(state => state.errors.endLocation),
        wrongFormat: useSelector(state => state.errors.wrongFormat),
    }

    const post = useSelector(state => state.post.post);

    console.log(post);

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    const getPostData = (post) => {
        post.title = !isEmpty(post.title) ? post.title : "";
        post.description = !isEmpty(post.description) ? post.description : "";
        post.startDate = !isEmpty(post.startDate) ? post.startDate : "";
        post.startTime = !isEmpty(post.startTime) ? post.startTime : "";
        post.startLocation = !isEmpty(post.startLocation) ? post.startLocation : "";
        post.endLocation = !isEmpty(post.endLocation) ? post.endLocation : "";

        console.log(post.startDate);
        console.log(post.startTime);


        setTitle(post.title);
        setDescription(post.description);
        setStartDate(post.startDate);
        setStartTime(post.startTime);
        setStartLocation(post.startLocation);
        setEndLocation(post.endLocation);
    }

    useEffect(() => {
        getPost(postId);
        getPostData(post);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const body = {
            title,
            description,
            startDate,
            startTime,
            startLocation,
            endLocation
        };

        if (startLocation || endLocation) { // Only start validating if there is input
            if (startLocation === endLocation) {
                openModal();
                return
            }
        } else if (errors) {
            scrollTop();
        }
        dispatch(editPost(postId, body, props.history));
    };

    const goBack = () => {
        return props.history.goBack();
    }


    return (
        <div className="edit-post">
            <div className="edit-post__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>
            {errors.title || errors.startLocation || errors.endLocation ? <Errors errors={errors} /> : null}
            <div className="edit-post__container">
                <div className="edit-post__card">
                    <h1 className="edit-post__main-title">Edit Groupride</h1>
                    <form noValidate="novalidate" className="edit-post__form" onSubmit={e => onSubmit(e)}>
                        <div className="form-field mb">
                            <input
                                name="title"
                                type="description"
                                placeholder="Name your ride (required)"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>
                        <div className="form-field">
                            <textarea
                                name="description"
                                placeholder="Description or additional information about your ride (optional)"
                                id=""
                                cols="54"
                                rows="5"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            >
                            </textarea>
                        </div>
                        <DatePickerInput
                            value={startDate}
                            onChange={date => setStartDate(date)}
                            placeholder="Select start date of the ride (required)"
                        />
                        <TimePickerInput
                            value={startTime}
                            onChange={time => setStartTime(time)}
                            placeholder="Select start time of the ride (required)"
                        />
                        <div className="form-field question-container">
                            <LocationSearchInput
                                value={startLocation}
                                onChange={location => setStartLocation(location)}
                                onSelect={location => setStartLocation(location)}
                                placeholder="Start location of your group ride (required)"
                            />
                            <i data-tip="A route will be generated with your start and end location" className="fa fa-question-circle" aria-hidden="true"></i>
                        </div>
                        <div className="form-field question-container">
                            <LocationSearchInput
                                value={endLocation}
                                onChange={location => setEndLocation(location)}
                                onSelect={location => setEndLocation(location)}
                                placeholder="End location of your group ride (required)"
                            />
                            <i data-tip="The distance of the route will also be calculated" className="fa fa-question-circle" aria-hidden="true"></i>
                        </div>
                        <ReactTooltip />
                        <div className="edit-post__button-container">
                            <input type="submit" value="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPost;
