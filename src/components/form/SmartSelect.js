'use client';

import React from 'react';
import CreatableSelect from 'react-select/creatable';

export default function SmartSelect({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  isMulti = false,
  className = '' 
}) {
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '6px',
      borderRadius: '8px',
      border: state.isFocused ? '1.5px solid #2C5E3E' : '1.5px solid #E2E8F0',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(44, 94, 62, 0.1)' : 'none',
      transition: 'all 0.2s ease',
      fontSize: '15px',
      backgroundColor: 'white',
      '&:hover': {
        borderColor: state.isFocused ? '#2C5E3E' : '#CBD5E1',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#2C5E3E' 
        : state.isFocused 
          ? 'rgba(44, 94, 62, 0.05)' 
          : 'white',
      color: state.isSelected ? 'white' : '#334155',
      cursor: 'pointer',
      fontSize: '15px',
      '&:active': {
        backgroundColor: '#2C5E3E',
        color: 'white',
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(44, 94, 62, 0.1)',
      borderRadius: '20px',
      padding: '2px 6px',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#2C5E3E',
      fontWeight: '600',
      fontSize: '14px',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#2C5E3E',
      cursor: 'pointer',
      borderRadius: '50%',
      marginLeft: '4px',
      '&:hover': {
        backgroundColor: '#2C5E3E',
        color: 'white',
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#94A3B8',
    })
  };

  // Convert pure string value or array of strings to react-select {label, value} format
  const getValue = () => {
    if (!value) return isMulti ? [] : null;
    
    if (isMulti) {
      if (Array.isArray(value)) {
        return value.map(v => typeof v === 'string' ? { label: v, value: v } : v);
      }
      // If it's a comma separated string (fallback)
      if (typeof value === 'string') {
        return value.split(',').filter(Boolean).map(v => ({ label: v.trim(), value: v.trim() }));
      }
      return [];
    }
    
    return typeof value === 'string' ? { label: value, value } : value;
  };

  const handleChange = (selectedOption) => {
    if (isMulti) {
      // Return array of strings
      const values = selectedOption ? selectedOption.map(opt => opt.value) : [];
      onChange(values);
    } else {
      // Return single string
      onChange(selectedOption ? selectedOption.value : '');
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <CreatableSelect
        isClearable
        isMulti={isMulti}
        options={options}
        value={getValue()}
        onChange={handleChange}
        placeholder={placeholder || 'Select or type to add...'}
        styles={customStyles}
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
        noOptionsMessage={() => "Type to add custom option..."}
      />
    </div>
  );
}
