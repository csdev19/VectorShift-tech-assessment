// textNode.js

import React, { useState, useEffect, useRef } from 'react';
import { BaseNode } from './BaseNode';
import { TextAreaInput } from '../components/inputs';

const TextNodeComponent = ({ id, state, updateState }) => {
  const textareaRef = useRef(null);
  const [detectedVariables, setDetectedVariables] = useState([]);
  const [nodeSize, setNodeSize] = useState('large');

  // Function to detect variables in text using regex
  const detectVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = [];
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      const variableName = match[1];
      if (!variables.includes(variableName)) {
        variables.push(variableName);
      }
    }

    return variables;
  };

  // Function to calculate optimal node size based on content
  const calculateNodeSize = (text) => {
    const lines = text.split('\n').length;
    const maxLineLength = Math.max(...text.split('\n').map(line => line.length));

    // Determine size based on content
    if (lines <= 2 && maxLineLength <= 30) {
      return 'medium';
    } else if (lines <= 4 && maxLineLength <= 50) {
      return 'large';
    } else {
      return 'xlarge';
    }
  };

  // Auto-resize textarea based on content
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  // Update variables and size when text changes
  useEffect(() => {
    const variables = detectVariables(state.text);
    setDetectedVariables(variables);

    const newSize = calculateNodeSize(state.text);
    setNodeSize(newSize);

    // Auto-resize after a short delay to ensure DOM is updated
    setTimeout(autoResize, 0);
  }, [state.text]);

  // Handle text change
  const handleTextChange = (e) => {
    updateState('text', e.target.value);
  };

  // Render input handles for detected variables
  const renderVariableHandles = () => {
    if (detectedVariables.length === 0) return null;

    return detectedVariables.map((variable, index) => (
      <BaseNode.InputHandle
        key={variable}
        id={variable}
        nodeId={id}
        style={{
          top: `${(index + 1) * (100 / (detectedVariables.length + 1))}%`
        }}
      />
    ));
  };

  // Calculate dynamic container style
  const getContainerStyle = () => {
    const baseStyle = {};

    // Adjust width based on content length
    const maxLineLength = Math.max(...state.text.split('\n').map(line => line.length));
    if (maxLineLength > 40) {
      baseStyle.width = '350px';
    } else if (maxLineLength > 25) {
      baseStyle.width = '280px';
    }

    return baseStyle;
  };

  return (
    <BaseNode.Container
      variant="text"
      size={nodeSize}
      style={getContainerStyle()}
    >
      {/* Render input handles for detected variables */}
      {renderVariableHandles()}

      <BaseNode.Header>Text</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <TextAreaInput
            ref={textareaRef}
            label="Text"
            value={state.text}
            onChange={handleTextChange}
            rows={Math.max(3, state.text.split('\n').length)}
            placeholder="Enter text with {{variables}}..."
            inputStyle={{
              minHeight: '60px',
              height: 'auto',
              resize: 'vertical',
              overflow: 'hidden' // Prevent scrollbar during auto-resize
            }}
          />
        </BaseNode.Field>
      </BaseNode.Content>

      {/* Show detected variables info */}
      {detectedVariables.length > 0 && (
        <BaseNode.CustomContent>
          Variables: {detectedVariables.join(', ')}
        </BaseNode.CustomContent>
      )}

      <BaseNode.OutputHandle id="output" nodeId={id} />
    </BaseNode.Container>
  );
};

// Define default state
TextNodeComponent.defaultState = {
  text: '{{input}}'
};

// Export with state management
export const TextNode = BaseNode.withState(TextNodeComponent);