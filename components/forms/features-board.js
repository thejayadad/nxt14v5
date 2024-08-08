'use client'
import React, { useState } from 'react';

const FeaturesBoard = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      onChange([...value, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDelete = (tag) => {
    onChange(value.filter(item => item !== tag));
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a feature and press Enter"
        className="p-2 border border-gray-300 rounded-md"
      />
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-md">
            <span>{tag}</span>
            <button onClick={() => handleDelete(tag)} className="text-red-500">x</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBoard;
