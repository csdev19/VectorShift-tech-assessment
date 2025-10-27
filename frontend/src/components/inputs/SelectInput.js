// SelectInput.js
// Reusable select input component

import React from 'react';

export const SelectInput = ({
  label,
  value,
  onChange,
  options = [],
  style = {},
  labelStyle = {},
  inputStyle = {},
  ...props
}) => {
  const defaultLabelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '11px',
    fontWeight: '500',
    color: '#333',
    ...labelStyle
  };

  const defaultInputStyle = {
    padding: '6px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '12px',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff',
    height: '32px',
    ...inputStyle
  };

  return (
    <label style={defaultLabelStyle}>
      {label}:
      <select
        value={value}
        onChange={onChange}
        style={defaultInputStyle}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};
