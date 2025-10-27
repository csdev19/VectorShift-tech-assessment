// inputNode.js

import React from 'react';
import { BaseNode } from './BaseNode';
import { TextInput, SelectInput } from '../components/inputs';

const InputNodeComponent = ({ id, state, updateState }) => {
  return (
    <BaseNode.Container variant="input" size="medium">
      <BaseNode.Header>Input</BaseNode.Header>

      <BaseNode.Content>
        <BaseNode.Field>
          <TextInput
            label="Name"
            value={state.inputName}
            onChange={(e) => updateState('inputName', e.target.value)}
          />
        </BaseNode.Field>

        <BaseNode.Field>
          <SelectInput
            label="Type"
            value={state.inputType}
            onChange={(e) => updateState('inputType', e.target.value)}
            options={[
              { value: 'Text', label: 'Text' },
              { value: 'File', label: 'File' }
            ]}
          />
        </BaseNode.Field>
      </BaseNode.Content>

      <BaseNode.OutputHandle id="value" nodeId={id} />
    </BaseNode.Container>
  );
};

// Define default state
InputNodeComponent.defaultState = {
  inputName: (id) => id.replace('customInput-', 'input_'),
  inputType: 'Text'
};

// Export with state management
export const InputNode = BaseNode.withState(InputNodeComponent);