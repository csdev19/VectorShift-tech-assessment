// NumberInput.js
// Reusable number input component

import React from 'react';

export const NumberInput = ({
  label,
  value,
  onChange,
  placeholder = '',
  min,
  max,
  step,
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
    height: '32px',
    ...inputStyle
  };

  return (
    <label style={defaultLabelStyle}>
      {label}:
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        style={defaultInputStyle}
        {...props}
      />
    </label>
  );
};
