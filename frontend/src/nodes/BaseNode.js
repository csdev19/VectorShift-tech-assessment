// BaseNode.js
// Compound component pattern for React Flow nodes

import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Box } from '../components/Box';

// Main BaseNode component
const BaseNode = ({ children, variant = 'default', size = 'medium', style = {} }) => {
  return (
    <Box variant={variant} size={size} style={style}>
      {children}
    </Box>
  );
};

// Container component (alias for BaseNode)
BaseNode.Container = BaseNode;

// Header component
BaseNode.Header = ({ children, style = {} }) => (
  <div style={{
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '14px',
    ...style
  }}>
    {children}
  </div>
);

// Content component
BaseNode.Content = ({ children, style = {} }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    minHeight: '0', // Allow content to shrink
    overflow: 'visible', // Allow content to expand
    ...style
  }}>
    {children}
  </div>
);

// Handle components
BaseNode.InputHandle = ({ id, nodeId, style = {}, ...props }) => (
  <Handle
    type="target"
    position={Position.Left}
    id={`${nodeId}-${id}`}
    style={style}
    {...props}
  />
);

BaseNode.OutputHandle = ({ id, nodeId, style = {}, ...props }) => (
  <Handle
    type="source"
    position={Position.Right}
    id={`${nodeId}-${id}`}
    style={style}
    {...props}
  />
);

// Custom content component
BaseNode.CustomContent = ({ children, style = {} }) => (
  <div style={{
    fontSize: '10px',
    color: '#666',
    textAlign: 'center',
    marginTop: '4px',
    ...style
  }}>
    {children}
  </div>
);

// Field wrapper component
BaseNode.Field = ({ children, style = {} }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginBottom: '4px',
    ...style
  }}>
    {children}
  </div>
);

// Higher-order component for state management
BaseNode.withState = (NodeComponent) => {
  return ({ id, data, ...props }) => {
    const [state, setState] = useState(() => {
      // Initialize state from data or defaults
      const initialState = {};
      if (NodeComponent.defaultState) {
        Object.keys(NodeComponent.defaultState).forEach(key => {
          const defaultValue = typeof NodeComponent.defaultState[key] === 'function'
            ? NodeComponent.defaultState[key](id)
            : NodeComponent.defaultState[key];
          initialState[key] = data?.[key] || defaultValue || '';
        });
      }
      return initialState;
    });

    const updateState = (fieldName, value) => {
      setState(prev => ({ ...prev, [fieldName]: value }));
    };

    return (
      <NodeComponent
        id={id}
        data={data}
        state={state}
        updateState={updateState}
        {...props}
      />
    );
  };
};

export { BaseNode };