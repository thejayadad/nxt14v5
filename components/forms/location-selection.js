'use client'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import LocationMap from './location-map';
import { stateCapitals } from '@/lib/data/city-states';

const LocationSelection = ({ value, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = stateCapitals.map(item => ({
    label: `${item.capital}, ${item.state} ${item.zip}`,
    value: {
      city: item.capital,
      state: item.state,
      zip: item.zip,
      latitude: item.latitude,
      longitude: item.longitude
    }
  }));

  useEffect(() => {
    const defaultCity = options.find(option => option.value.city === "Washington" && option.value.state === "D.C.");
    setSelectedOption(defaultCity);

    if (value) {
      const matchedOption = options.find(option => option.value.city === value.city && option.value.state === value.state);
      setSelectedOption(matchedOption);
    }
  }, []);

  useEffect(() => {
    if (value) {
      const matchedOption = options.find(option => option.value.city === value.city && option.value.state === value.state);
      setSelectedOption(matchedOption);
    }
  }, [value]);

  const handleChange = (selected) => {
    console.log('Selected Option: ', selected);
    setSelectedOption(selected);
    onChange(selected.value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select a state capital"
        className="w-full"
        styles={{ menu: base => ({ ...base, maxHeight: '400px' }) }}
      />
      <LocationMap center={selectedOption ? [selectedOption.value.latitude, selectedOption.value.longitude] : [37.7749, -122.4194]} />
    </div>
  );
};

export default LocationSelection;
