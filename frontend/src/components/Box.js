// Box.js
// Reusable container component with consistent styling

import React from 'react';

export const Box = ({
  children,
  style = {},
  variant = 'default',
  size = 'medium',
  ...props
}) => {
  const baseStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxSizing: 'border-box',
    overflow: 'visible',
    ...style
  };

  const variants = {
    default: {
      borderColor: '#ccc',
      backgroundColor: '#fff'
    },
    input: {
      borderColor: '#4CAF50',
      backgroundColor: '#f8fff8'
    },
    output: {
      borderColor: '#FF9800',
      backgroundColor: '#fff8f0'
    },
    text: {
      borderColor: '#2196F3',
      backgroundColor: '#f0f8ff'
    },
    llm: {
      borderColor: '#9C27B0',
      backgroundColor: '#faf0ff'
    },
    math: {
      borderColor: '#FF5722',
      backgroundColor: '#fff3e0'
    },
    filter: {
      borderColor: '#607D8B',
      backgroundColor: '#f5f5f5'
    },
    api: {
      borderColor: '#E91E63',
      backgroundColor: '#fce4ec'
    },
    delay: {
      borderColor: '#795548',
      backgroundColor: '#efebe9'
    },
    dataProcessing: {
      borderColor: '#3F51B5',
      backgroundColor: '#e8eaf6'
    }
  };

  const sizes = {
    small: {
      width: '150px',
      minHeight: '60px',
      height: 'auto',
      padding: '6px'
    },
    medium: {
      width: '200px',
      minHeight: '80px',
      height: 'auto',
      padding: '8px'
    },
    large: {
      width: '250px',
      minHeight: '120px',
      height: 'auto',
      padding: '12px'
    },
    xlarge: {
      width: '300px',
      minHeight: '160px',
      height: 'auto',
      padding: '16px'
    }
  };

  const combinedStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...style
  };

  return (
    <div style={combinedStyles} {...props}>
      {children}
    </div>
  );
};
