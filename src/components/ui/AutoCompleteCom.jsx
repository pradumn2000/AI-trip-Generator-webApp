
import React, { useState, useRef, useEffect } from 'react';

function AutoCompleteCom({ selectProps }) {
  const { onChange } = selectProps;
  const [inputValue, setInputValue] = useState('');
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      const input = document.getElementById('autocomplete-input');
      const options = {
        fields: ['address_components', 'geometry', 'name', 'place_id', 'reference', 'formatted_address'],
        types: ['geocode'],
      };

      const autocomplete = new window.google.maps.places.Autocomplete(input, options);
      autocompleteRef.current = autocomplete;

      autocomplete.addListener('place_changed', () => {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace.geometry) {
          const placeData = {
            inputText: inputValue,
            name: selectedPlace.name,
            place_id: selectedPlace.place_id,
            reference: selectedPlace.reference,
            formatted_address: selectedPlace.formatted_address,
            location: selectedPlace.geometry.location.toJSON(),
          };
          onChange(placeData);
        }
      });
    }
  }, [inputValue, onChange]);

  return (
    <div>
      <form>
        <label htmlFor="autocomplete-input" className="block text-sm font-medium text-gray-900">
          Location: {inputValue}
        </label>
        <input
          id="autocomplete-input"
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search for a place"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default AutoCompleteCom;
