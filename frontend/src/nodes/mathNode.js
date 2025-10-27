// mathNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { SelectInput, NumberInput } from '../components/inputs';

const MathNodeComponent = ({ id, state, updateState }) => {
  const getOperationSymbol = (operation) => {
    const symbols = {
      add: 'A + B',
      subtract: 'A - B',
      multiply: 'A × B',
      divide: 'A ÷ B',
      power: 'A ^ B',
      sqrt: '√A'
    };
    return symbols[operation] || 'A + B';
  };

  return (
    <BaseNode.Container variant="math" size="medium">
      <BaseNode.InputHandle id="a" nodeId={id} style={{ top: '30%' }} />
      <BaseNode.InputHandle id="b" nodeId={id} style={{ top: '70%' }} />

      <BaseNode.Header>Math</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <SelectInput
            label="Operation"
            value={state.operation}
            onChange={(e) => updateState('operation', e.target.value)}
            options={[
              { value: 'add', label: 'Add (+)' },
              { value: 'subtract', label: 'Subtract (-)' },
              { value: 'multiply', label: 'Multiply (×)' },
              { value: 'divide', label: 'Divide (÷)' },
              { value: 'power', label: 'Power (^)' },
              { value: 'sqrt', label: 'Square Root (√)' }
            ]}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <NumberInput
            label="Value"
            value={state.value}
            onChange={(e) => updateState('value', e.target.value)}
            placeholder="Enter number..."
          />
        </BaseNode.Field>
      </BaseNode.Content>

      <BaseNode.CustomContent>
        {getOperationSymbol(state.operation)}
      </BaseNode.CustomContent>

      <BaseNode.OutputHandle id="result" nodeId={id} />
    </BaseNode.Container>
  );
};

// Define default state
MathNodeComponent.defaultState = {
  operation: 'add',
  value: '0'
};

// Export with state management
export const MathNode = BaseNode.withState(MathNodeComponent);