import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Spinner from '../common/spinner/Spinner';

import PropTypes from 'prop-types';

import './location-search.scss';

const LocationSearchInput = ({
    placeholder,
    value,
    custom,
    onChange,
    onSelect,
}) => {

    const options = {
        componentRestrictions: { country: ['be'] },
        types: ['address']
    }

    return (
        <PlacesAutocomplete
            value={value}
            searchOptions={options}
            onChange={onChange}
            onSelect={onSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className="location-search">
                    <input
                        {...getInputProps({
                            placeholder: placeholder,
                        })}
                        data-test={custom}
                    />
                    <div className="location-search__autocomplete-dropdown-container">
                        {loading ? (
                            <div className="location-search__loader-container">
                                <Spinner />
                            </div>
                        ) : null}
                        {suggestions.map((suggestion, index) => {
                            const className = suggestion.active
                                ? 'location-search__suggestion-item-active'
                                : 'location-search__suggestion-item';
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                    })}
                                    key={index}
                                >
                                    <span
                                        key={index}
                                    >
                                        {suggestion.description}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    )
}

LocationSearchInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    custom: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
}

export default LocationSearchInput;