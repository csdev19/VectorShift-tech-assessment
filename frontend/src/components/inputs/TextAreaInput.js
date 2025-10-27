// TextAreaInput.js
// Reusable textarea input component

import React, { forwardRef } from 'react';

export const TextAreaInput = forwardRef(({
  label,
  value,
  onChange,
  placeholder = '',
  rows = 3,
  style = {},
  labelStyle = {},
  inputStyle = {},
  ...props
}, ref) => {
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
    fontSize: '11px',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: 'vertical',
    fontFamily: 'monospace',
    minHeight: '60px',
    lineHeight: '1.4',
    ...inputStyle
  };

  return (
    <label style={defaultLabelStyle}>
      {label}:
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={defaultInputStyle}
        {...props}
      />
    </label>
  );
});
