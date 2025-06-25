import React from 'react';


const LocationSearchPanel = ({ suggestions, onSelectSuggestion, setPanelOpen }) => {
  return (
    <div className='mr-5 mt-9'>
      {suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          onClick={() => {
            onSelectSuggestion(suggestion.description);
            // setPanelOpen(false);
          }}
          className='flex border-2 border-gray-200 active:border-black p-2 rounded-xl items-center my-2 justify-start gap-4'
        >
          <h2 className='bg-[#eee] h-6 w-9 flex items-center justify-center rounded-full'>
            <i className="ri-map-pin-2-fill"></i>
          </h2>
          <h4>{suggestion.description}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;