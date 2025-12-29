import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../redux/actions/postActions';

import { Modal } from '@material-ui/core';

import { scrollTop } from '../../../utils';

import Errors from '../../../components/common/errors/Errors';
import ReactTooltip from 'react-tooltip';

import TimePickerInput from '../../../components/common/timepicker/TimePickerInput';
import DatePickerInput from '../../../components/common/datepicker/DatePickerInput';
import LocationSearchInput from '../../../components/location-search-input/LocationSearchInput';

import Geocode from 'react-geocode';

import './createpost.scss';

const CreatePost = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState();

    const [startLocation, setStartLocation] = useState("");
    const [endLocation, setEndLocation] = useState("");

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const openModal = () => {
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false);
    }

    const errors = {
        title: useSelector(state => state.errors.title),
        startDate: useSelector(state => state.errors.startDate),
        startTime: useSelector(state => state.errors.startTime),
        startLocation: useSelector(state => state.errors.startLocation),
        endLocation: useSelector(state => state.errors.endLocation),
        wrongFormat: useSelector(state => state.errors.wrongFormat),
    }

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
        dispatch(addPost(body, props.history));
    };

    const handleTitleChange = (e) => {
        // const regex = /[^a-zA-Z ]/g;
        setTitle(e.target.value);
    }

    const askStartLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // Get address from latitude & longitude.
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
                    .then((response) => {
                        const address = response.results[0].formatted_address;
                        if (endLocation === address) {
                            openModal();
                            return;
                        }
                        setStartLocation(address);
                    }, (error) => {
                        console.log(error);
                    });
            });
        }
    }

    const askEndLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // Get address from latitude & longitude.
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude)
                    .then((response) => {
                        const address = response.results[0].formatted_address;
                        if (startLocation === address) {
                            openModal();
                            return;
                        }
                        setEndLocation(address);
                    }, (error) => {
                        console.log(error);
                    });
            });
        }
    }

    const goBack = () => {
        return props.history.goBack();
    }

    useEffect(() => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_ACCESS_TOKEN);
        Geocode.setRegion("be");
        Geocode.enableDebug();
    })

    return (
        <div className="create-post">

            <div className="create-post__back-button-container">
                <button onClick={goBack} className="back-button">Go back</button>
            </div>

            <div className="create-post__container">
                {errors.title || errors.startDate || errors.startTime || errors.startLocation || errors.endLocation || errors.wrongFormat ? <Errors errors={errors} /> : null}
                <div className="create-post__card">
                    <h1 className="create-post__main-title">Create Group Ride</h1>
                    <form noValidate="novalidate" className="create-post__form" onSubmit={e => onSubmit(e)}>
                        <div className="form-field">
                            <input
                                autoComplete="off"
                                name="title"
                                type="description"
                                placeholder="Name your ride (required)"
                                data-test="title"
                                onChange={handleTitleChange}
                                value={title}
                            />
                            <small>e.g. Ride Ghent-Antwerp</small>
                        </div>
                        <div className="form-field">
                            <textarea
                                autoComplete="off"
                                name="description"
                                placeholder="Description or additional information about your ride (optional)"
                                id=""
                                cols="54"
                                rows="5"
                                data-test="description"
                                onChange={e => setDescription(e.target.value)}
                                value={description}
                            >
                            </textarea>
                            <small>e.g. We always stay together in group until the end.</small>
                        </div>
                        <DatePickerInput
                            value={startDate}
                            onChange={date => setStartDate(date)}
                            placeholder="Select start date of the ride (required)"
                            id="start-date"
                        />
                        <TimePickerInput
                            value={startTime}
                            onChange={time => setStartTime(time)}
                            placeholder="Select start time of the ride (required)"
                            id="start-time"
                        />
                        <div className="form-field question-container">
                            <LocationSearchInput
                                value={startLocation}
                                onChange={location => setStartLocation(location)}
                                onSelect={location => setStartLocation(location)}
                                placeholder="Start location of your group ride (required)"
                                custom="start-location"
                            />
                            <i onClick={askStartLocation} data-tip="Add your current location." className="geolocation fas fa-map-marker-alt" aria-hidden="true"></i>
                            <i data-tip="A route will be generated with your start and end location." className="info fa fa-question-circle" aria-hidden="true"></i>
                        </div>
                        <div className="form-field question-container mb">
                            <LocationSearchInput
                                value={endLocation}
                                onChange={location => setEndLocation(location)}
                                onSelect={location => setEndLocation(location)}
                                placeholder="End location of your group ride (required)"
                                custom="end-location"
                            />
                            <i onClick={askEndLocation} data-tip="Add your current location." className="geolocation fas fa-map-marker-alt" aria-hidden="true"></i>
                            <i data-tip="A route will be generated with your start and end location." className="info fa fa-question-circle" aria-hidden="true"></i>
                        </div>
                        <ReactTooltip />
                        <div className="create-post__button-container">
                            <input
                                type="submit"
                                value="Create"
                                data-test="create-button"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Modal
                open={open}
                onClose={closeModal}
                onBackdropClick={closeModal}
            >
                <div className="create-post__modal">
                    <div className="modal-wrapper">
                        <h1>Is this address correct?</h1>
                        <p>Start and end location can't be the same!</p>
                        <div className="buttons-container">
                            <button onClick={closeModal} className="delete-button">Ok</button>
                            <button onClick={closeModal} className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CreatePost;