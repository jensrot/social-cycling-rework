import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import {
    geocodeByAddress, getLatLng
} from 'react-places-autocomplete';

import * as style from './style.json';

const LocationMap = ({ address, isMarkerShown }) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(geocode => {
                setLatitude(geocode.lat);
                setLongitude(geocode.lng);
            })
            .catch(error => {
                console.error('Error', error)
            });
    }, []);


    const MapComponent = withGoogleMap(() =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: latitude, lng: longitude }}
            defaultOptions={{ styles: style }}
        >
            {isMarkerShown ? <Marker position={{ lat: latitude, lng: longitude }} /> : null}
        </GoogleMap>
    )

    return (
        <React.Fragment>
            {latitude & longitude ? (
                <MapComponent
                    loadingElement={<div style={{ height: `15rem` }} />}
                    containerElement={<div style={{ height: `15rem`, borderRadius: `10 px` }} />}
                    mapElement={<div style={{ height: `100%`, borderRadius: `10 px` }} />}
                />
            ) : null}
        </React.Fragment>
    )

}

LocationMap.propTypes = {
    address: PropTypes.string,
    isMarkerShown: PropTypes.bool,
}

export default LocationMap;